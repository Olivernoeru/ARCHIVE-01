const { getPool } = require('../config/database');

/**
 * GET /api/products - Dapatkan daftar product
 * Query params:
 *   sort: allowlist ['newest'] -> ORDER BY p.product_id DESC
 *   limit: strict positive int, max 12, parameterized ?, HTTP 400 on invalid
 *   includeVariants: 'true' attaches variants via IN (...), skipped when empty
 *   category_id: WHERE p.category_id = ?
 */
async function getProducts(req, res) {
  try {
    const { sort, limit, includeVariants, category_id } = req.query;

    // Validate limit parameter: strict positive integer, cap 12
    let limitClause = '';
    const limitParams = [];
    if (limit !== undefined && limit !== '') {
      if (!/^\d+$/.test(limit) || parseInt(limit, 10) === 0) {
        return res.status(400).json({ success: false, message: 'Invalid limit parameter' });
      }
      const limitVal = Math.min(parseInt(limit, 10), 12);
      limitClause = 'LIMIT ?';
      limitParams.push(limitVal);
    }

    // Build WHERE clause
    let whereClause = '';
    const whereParams = [];
    if (category_id !== undefined && category_id !== '') {
      whereClause = 'WHERE p.category_id = ?';
      whereParams.push(category_id);
    }

    // Build ORDER BY clause (allowlist only)
    let orderByClause = '';
    if (sort === 'newest') {
      orderByClause = 'ORDER BY p.product_id DESC';
    }

    // Base query (byte-for-byte identical when no optional params supplied)
    const baseQuery = `
      SELECT p.*, c.nama_kategori as category_name
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      ${whereClause}
      ${orderByClause}
      ${limitClause}
    `;

    const allParams = [...whereParams, ...limitParams];
    const [rows] = await getPool().execute(baseQuery, allParams);

    // Handle includeVariants: single IN (...) query, skipped when result is empty
    let products = rows;
    if (includeVariants === 'true' && products.length > 0) {
      const productIds = products.map((p) => p.product_id);
      const placeholders = productIds.map(() => '?').join(',');
      const [variants] = await getPool().execute(
        `SELECT * FROM product_variant WHERE product_id IN (${placeholders}) ORDER BY variant_id ASC`,
        productIds
      );

      const variantsMap = {};
      variants.forEach((v) => {
        if (!variantsMap[v.product_id]) variantsMap[v.product_id] = [];
        variantsMap[v.product_id].push(v);
      });

      products = products.map((p) => ({
        ...p,
        variants: variantsMap[p.product_id] || [],
      }));
    }

    res.json({ success: true, data: products });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data product' });
  }
}

/**
 * GET /api/products/:id - Dapatkan satu product berdasarkan ID
 */
async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await getPool().execute(
      'SELECT p.*, c.nama_kategori as category_name FROM product p LEFT JOIN category c ON p.category_id = c.category_id WHERE p.product_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    }

    // Ambil variant untuk product ini
    const [variants] = await getPool().execute(
      'SELECT * FROM product_variant WHERE product_id = ?',
      [id]
    );

    res.json({
      success: true,
      data: {
        ...rows[0],
        variants,
      },
    });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data product' });
  }
}

/**
 * POST /api/products - Buat product baru
 */
async function createProduct(req, res) {
  try {
    const { category_id, nama_produk, target, deskripsi, foto, status } = req.body;

    // Validasi field wajib
    if (!nama_produk || !target) {
      return res.status(400).json({ success: false, message: 'Nama produk dan target wajib diisi' });
    }

    // Validasi target harus salah satu dari enum
    const validTargets = ['Women', 'Men', 'Unisex'];
    if (!validTargets.includes(target)) {
      return res.status(400).json({ success: false, message: 'Target harus salah satu dari: Women, Men, Unisex' });
    }

    // Validasi status jika diberikan
    if (status) {
      const validStatuses = ['Tersedia', 'Tidak Tersedia'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Status harus salah satu dari: Tersedia, Tidak Tersedia' });
      }
    }

    // Set status default jika tidak diberikan
    const finalStatus = status || 'Tersedia';

    // Cek apakah category_id valid jika diberikan
    if (category_id) {
      const [catCheck] = await getPool().execute('SELECT * FROM category WHERE category_id = ?', [category_id]);

      if (catCheck.length === 0) {
        return res.status(400).json({ success: false, message: 'Category ID tidak valid' });
      }
    }

    const [result] = await getPool().execute(
      'INSERT INTO product (category_id, nama_produk, target, deskripsi, foto, status) VALUES (?, ?, ?, ?, ?, ?)',
      [category_id || null, nama_produk, target, deskripsi || null, foto || null, finalStatus]
    );

    res.status(201).json({ success: true, data: { product_id: result.insertId, category_id, nama_produk, target, deskripsi, foto, status: finalStatus } });
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ success: false, message: 'Gagal membuat product' });
  }
}
/**
 * PUT /api/products/:id - Perbarui product
 */
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { category_id, nama_produk, target, deskripsi, foto, status } = req.body;

    // Cek apakah product ada
    const [check] = await getPool().execute('SELECT * FROM product WHERE product_id = ?', [id]);

    if (check.length === 0) {
      return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    }

    // Validasi target jika diubah
    if (target) {
      const validTargets = ['Women', 'Men', 'Unisex'];
      if (!validTargets.includes(target)) {
        return res.status(400).json({ success: false, message: 'Target harus salah satu dari: Women, Men, Unisex' });
      }
    }

    // Validasi status jika diubah
    if (status !== undefined) {
      const validStatuses = ['Tersedia', 'Tidak Tersedia'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Status harus salah satu dari: Tersedia, Tidak Tersedia' });
      }
    }

    // Cek apakah category_id valid jika diberikan
    if (category_id !== undefined && category_id !== null) {
      const [catCheck] = await getPool().execute('SELECT * FROM category WHERE category_id = ?', [category_id]);

      if (catCheck.length === 0) {
        return res.status(400).json({ success: false, message: 'Category ID tidak valid' });
      }
    }

    // Build update query dynamically
    const updates = [];
    const params = [];

    if (category_id !== undefined) {
      updates.push('category_id = ?');
      params.push(category_id !== null ? category_id : null);
    }
    if (nama_produk) {
      updates.push('nama_produk = ?');
      params.push(nama_produk);
    }
    if (target) {
      updates.push('target = ?');
      params.push(target);
    }
    if (deskripsi !== undefined) {
      updates.push('deskripsi = ?');
      params.push(deskripsi);
    }
    if (foto !== undefined) {
      updates.push('foto = ?');
      params.push(foto);
    }
    if (status !== undefined) {
      updates.push('status = ?');
      params.push(status);
    }

    params.push(id);

    // Tangani permintaan pembaruan tanpa field yang valid
    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada field yang valid untuk diperbarui' });
    }

    await getPool().execute(`UPDATE product SET ${updates.join(", ")} WHERE product_id = ?`, params);

    // Ambil data produk terbaru setelah update
    const [updatedRows] = await getPool().execute(
      'SELECT p.*, c.nama_kategori as category_name FROM product p LEFT JOIN category c ON p.category_id = c.category_id WHERE p.product_id = ?',
      [id]
    );

    res.json({ success: true, data: updatedRows[0] });
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ success: false, message: 'Gagal memperbarui product' });
  }
}

/**
 * DELETE /api/products/:id - Hapus product
 */
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    // Cek apakah product ada
    const [check] = await getPool().execute('SELECT * FROM product WHERE product_id = ?', [id]);

    if (check.length === 0) {
      return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    }

    // Cek apakah variant ini digunakan pada order_detail
    const [variantCheck] = await getPool().execute(
      'SELECT * FROM product_variant WHERE product_id = ?',
      [id]
    );

    if (variantCheck.length > 0) {
      // Cek apakah order_detail merujuk ke variant ini
      for (const variant of variantCheck) {
        const [orderDetailCheck] = await getPool().execute(
          'SELECT * FROM order_detail WHERE variant_id = ?',
          [variant.variant_id]
        );

        if (orderDetailCheck.length > 0) {
          return res.status(409).json({ success: false, message: 'Tidak dapat menghapus product karena variant masih digunakan dalam order_detail' });
        }
      }
    }

    // Hapus variant terlebih dahulu, lalu product
    await getPool().execute('DELETE FROM product_variant WHERE product_id = ?', [id]);
    await getPool().execute('DELETE FROM product WHERE product_id = ?', [id]);

    res.json({ success: true, message: 'Product berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ success: false, message: 'Gagal menghapus product' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
