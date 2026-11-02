const { getPool } = require('../config/database');

/**
 * GET /api/categories - Dapatkan daftar kategori
 */
async function getCategories(req, res) {
  try {
    const [rows] = await getPool().execute('SELECT * FROM category');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data kategori' });
  }
}

/**
 * GET /api/categories/:id - Dapatkan satu kategori berdasarkan ID
 */
async function getCategoryById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await getPool().execute('SELECT * FROM category WHERE category_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Error fetching category:', err.message);
    res.status(500).json({ success: false, message: 'Gagal mengambil data kategori' });
  }
}

/**
 * POST /api/categories - Buat kategori baru
 */
async function createCategory(req, res) {
  try {
    const { nama_kategori } = req.body;

    if (!nama_kategori) {
      return res.status(400).json({ success: false, message: 'Nama kategori wajib diisi' });
    }

    // Cek apakah kategori sudah ada (UNIQUE constraint)
    const [check] = await getPool().execute(
      'SELECT * FROM category WHERE nama_kategori = ?',
      [nama_kategori]
    );

    if (check.length > 0) {
      return res.status(409).json({ success: false, message: 'Kategori dengan nama tersebut sudah ada' });
    }

    const [result] = await getPool().execute(
      'INSERT INTO category (nama_kategori) VALUES (?)',
      [nama_kategori]
    );

    res.status(201).json({ success: true, data: { category_id: result.insertId, nama_kategori } });
  } catch (err) {
    console.error('Error creating category:', err.message);
    res.status(500).json({ success: false, message: 'Gagal membuat kategori' });
  }
}

/**
 * PUT /api/categories/:id - Perbarui kategori
 */
async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { nama_kategori } = req.body;

    if (!nama_kategori) {
      return res.status(400).json({ success: false, message: 'Nama kategori wajib diisi' });
    }

    // Cek apakah kategori ada
    const [check] = await getPool().execute('SELECT * FROM category WHERE category_id = ?', [id]);

    if (check.length === 0) {
      return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    }

    // Cek apakah nama kategori sudah digunakan oleh kategori lain
    const [nameCheck] = await getPool().execute(
      'SELECT * FROM category WHERE nama_kategori = ? AND category_id != ?',
      [nama_kategori, id]
    );

    if (nameCheck.length > 0) {
      return res.status(409).json({ success: false, message: 'Nama kategori sudah digunakan oleh kategori lain' });
    }

    await getPool().execute('UPDATE category SET nama_kategori = ? WHERE category_id = ?', [nama_kategori, id]);

    res.json({ success: true, data: { category_id: parseInt(id), nama_kategori } });
  } catch (err) {
    console.error('Error updating category:', err.message);
    res.status(500).json({ success: false, message: 'Gagal memperbarui kategori' });
  }
}

/**
 * DELETE /api/categories/:id - Hapus kategori
 * 
 * Aturan database: ON DELETE SET NULL
 * Jika category dihapus, product yang menggunakan category tetap ada dengan category_id = NULL
 */
async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    // Cek apakah kategori ada
    const [check] = await getPool().execute('SELECT * FROM category WHERE category_id = ?', [id]);

    if (check.length === 0) {
      return res.status(404).json({ success: false, message: 'Kategori tidak ditemukan' });
    }

    // Cek apakah product masih menggunakan category ini
    const [productCheck] = await getPool().execute(
      'SELECT * FROM product WHERE category_id = ?',
      [id]
    );

    if (productCheck.length > 0) {
      // Set category_id menjadi NULL pada product yang affected
      await getPool().execute('UPDATE product SET category_id = NULL WHERE category_id = ?', [id]);
    }

    await getPool().execute('DELETE FROM category WHERE category_id = ?', [id]);

    res.json({ success: true, message: 'Kategori berhasil dihapus' });
  } catch (err) {
    console.error('Error deleting category:', err.message);
    res.status(500).json({ success: false, message: 'Gagal menghapus kategori' });
  }
}

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};