const { getPool } = require('../config/database');

/**
 * GET /api/products/:productId/variants - Dapatkan semua variant untuk product
 */
async function getVariantsByProduct(req, res) {
  try {
    const { productId } = req.params;

    // Cek apakah product ada
    const [productCheck] = await getPool().execute('SELECT * FROM product WHERE product_id = ?', [productId]);

    if (productCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    }

    const [rows] = await getPool().execute(
      'SELECT * FROM product_variant WHERE product_id = ?',
      [productId]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching variants:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data variant' });
  }
}

/**
 * POST /api/products/:productId/variants - Buat variant baru untuk product
 */
async function createVariant(req, res) {
  try {
    const { productId } = req.params;
    const { ukuran, harga, stok } = req.body;

    // Cek apakah product ada
    const [productCheck] = await getPool().execute('SELECT * FROM product WHERE product_id = ?', [productId]);

    if (productCheck.length === 0) {
      return res.status(404).json({ success: false, message: 'Product tidak ditemukan' });
    }

    // Validasi field wajib
    if (!ukuran || harga === undefined) {
      return res.status(400).json({ success: false, message: 'Ukuran dan harga wajib diisi' });
    }

    // Validasi harga: harus numerik dan > 0
    const hargaNum = Number(harga);
    if (isNaN(hargaNum) || hargaNum <= 0) {
      return res.status(400).json({ success: false, message: 'Harga harus berupa angka lebih besar dari 0' });
    }

    // Validasi stok: harus numerik dan >= 0
    const stokNum = stok !== undefined ? Number(stok) : 0;
    if (isNaN(stokNum) || stokNum < 0) {
      return res.status(400).json({ success: false, message: 'Stok harus berupa angka tidak negatif' });
    }

    // Cek duplicate: satu product tidak boleh memiliki dua variant dengan ukuran yang sama
    const [duplicateCheck] = await getPool().execute(
      'SELECT * FROM product_variant WHERE product_id = ? AND ukuran = ?',
      [productId, ukuran]
    );

    if (duplicateCheck.length > 0) {
      return res.status(409).json({ success: false, message: 'Product sudah memiliki variant dengan ukuran tersebut' });
    }

    const [result] = await getPool().execute(
      'INSERT INTO product_variant (product_id, ukuran, harga, stok) VALUES (?, ?, ?, ?)',
      [productId, ukuran, hargaNum, stokNum]
    );

    res.status(201).json({ success: true, data: { variant_id: result.insertId, product_id: productId, ukuran, harga: hargaNum, stok: stokNum } });
  } catch (err) {
    console.error('Error creating variant:', err.message);
    res.status(500).json({ success: false, message: 'Gagal membuat variant' });
  }
}

/**
 * GET /api/variants/:id - Dapatkan satu variant berdasarkan ID
 */
async function getVariantById(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await getPool().execute('SELECT * FROM product_variant WHERE variant_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Variant tidak ditemukan' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Error fetching variant:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data variant' });
  }
}

/**
 * PUT /api/variants/:id - Perbarui variant
 */
async function updateVariant(req, res) {
  try {
    const { id } = req.params;
    const { ukuran, harga, stok } = req.body;

    // Cek apakah variant ada
    const [check] = await getPool().execute('SELECT * FROM product_variant WHERE variant_id = ?', [id]);

    if (check.length === 0) {
      return res.status(404).json({ success: false, message: 'Variant tidak ditemukan' });
    }

    // Validasi harga > 0 jika diubah
    if (harga !== undefined) {
      const hargaNum = Number(harga);
      if (isNaN(hargaNum) || hargaNum <= 0) {
        return res.status(400).json({ success: false, message: 'Harga harus berupa angka lebih besar dari 0' });
      }
    }

    // Validasi stok >= 0 jika diubah
    if (stok !== undefined) {
      const stokNum = Number(stok);
      if (isNaN(stokNum) || stokNum < 0) {
        return res.status(400).json({ success: false, message: 'Stok harus berupa angka tidak negatif' });
      }
    }

    // Jika ukuran diubah, cek duplicate
    if (ukuran && ukuran !== check[0].ukuran) {
      const [duplicateCheck] = await getPool().execute(
        'SELECT * FROM product_variant WHERE product_id = ? AND ukuran = ? AND variant_id != ?',
        [check[0].product_id, ukuran, id]
      );

      if (duplicateCheck.length > 0) {
        return res.status(409).json({ success: false, message: 'Product sudah memiliki variant dengan ukuran tersebut' });
      }
    }

    await getPool().execute(
      'UPDATE product_variant SET ukuran = ?, harga = ?, stok = ? WHERE variant_id = ?',
      [
        ukuran !== undefined ? ukuran : check[0].ukuran,
        harga !== undefined ? Number(harga) : check[0].harga,
        stok !== undefined ? Number(stok) : check[0].stok,
        id
      ]
    );

    // Ambil data variant terbaru setelah update
    const [updatedRows] = await getPool().execute('SELECT * FROM product_variant WHERE variant_id = ?', [id]);

    res.json({ success: true, data: updatedRows[0] });
  } catch (err) {
    console.error('Error updating variant:', err.message);
    res.status(500).json({ success: false, message: 'Gagal memperbarui variant' });
  }
}

/**
 * DELETE /api/variants/:id - Hapus variant
 */
async function deleteVariant(req, res) {
  try {
    const { id } = req.params;

    // Cek apakah variant ada
    const [check] = await getPool().execute('SELECT * FROM product_variant WHERE variant_id = ?', [id]);

    if (check.length === 0) {
      return res.status(404).json({ success: false, message: 'Variant tidak ditemukan' });
    }

    // Cek apakah variant direferensikan oleh order_detail
    const [orderDetailCheck] = await getPool().execute(
      'SELECT * FROM order_detail WHERE variant_id = ?',
      [id]
    );

    if (orderDetailCheck.length > 0) {
      return res.status(409).json({ success: false, message: 'Tidak dapat menghapus variant karena masih digunakan dalam order_detail' });
    }

    await getPool().execute('DELETE FROM product_variant WHERE variant_id = ?', [id]);

    res.json({ success: true, message: 'Variant berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting variant:', err.message);
    res.status(500).json({ success: false, message: 'Gagal menghapus variant' });
  }
}

module.exports = {
  getVariantsByProduct,
  createVariant,
  getVariantById,
  updateVariant,
  deleteVariant,
};