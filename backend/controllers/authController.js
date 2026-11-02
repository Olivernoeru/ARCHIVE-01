const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/database');

const SALT_ROUNDS = 10;

/**
 * Validasi format email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validasi input registrasi
 */
function validateRegisterInput({ username, email, password }) {
  const errors = [];
  
  if (!username || !username.trim()) {
    errors.push('Username wajib diisi');
  } else if (username.trim().length < 3) {
    errors.push('Username minimal 3 karakter');
  } else if (username.trim().length > 100) {
    errors.push('Username maksimal 100 karakter');
  }
  
  if (!email || !email.trim()) {
    errors.push('Email wajib diisi');
  } else if (!isValidEmail(email.trim())) {
    errors.push('Format email tidak valid');
  }
  
  if (!password) {
    errors.push('Password wajib diisi');
  } else if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }
  
  return errors;
}

/**
 * Validasi input login
 */
function validateLoginInput({ email, password }) {
  const errors = [];
  
  if (!email || !email.trim()) {
    errors.push('Email wajib diisi');
  } else if (!isValidEmail(email.trim())) {
    errors.push('Format email tidak valid');
  }
  
  if (!password) {
    errors.push('Password wajib diisi');
  }
  
  return errors;
}

/**
 * POST /api/auth/register
 * Registrasi customer baru
 */
async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    
    // Validasi input
    const validationErrors = validateRegisterInput({ username, email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: validationErrors.join(', ') 
      });
    }
    
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    
    // Cek duplikat username
    const [usernameCheck] = await getPool().execute(
      'SELECT customer_id FROM customer WHERE username = ?',
      [trimmedUsername]
    );
    
    if (usernameCheck.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username sudah digunakan' 
      });
    }
    
    // Cek duplikat email
    const [emailCheck] = await getPool().execute(
      'SELECT customer_id FROM customer WHERE email = ?',
      [trimmedEmail]
    );
    
    if (emailCheck.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email sudah terdaftar' 
      });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Insert customer baru
    const [result] = await getPool().execute(
      'INSERT INTO customer (username, email, password_hash) VALUES (?, ?, ?)',
      [trimmedUsername, trimmedEmail, passwordHash]
    );
    
    const customerId = result.insertId;
    
    // Generate JWT token
    const token = jwt.sign(
      { customer_id: customerId, username: trimmedUsername, email: trimmedEmail, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    // Return response tanpa password_hash
    res.status(201).json({
      success: true,
      data: {
        token,
        customer: {
          customer_id: customerId,
          username: trimmedUsername,
          email: trimmedEmail,
          foto_profil: null
        }
      },
      message: 'Registrasi berhasil'
    });
    
  } catch (err) {
    console.error('Error registering customer:', err.message);
    
    // Handle duplicate entry error (race condition)
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('uk_customer_username')) {
        return res.status(409).json({ 
          success: false, 
          message: 'Username sudah digunakan' 
        });
      }
      if (err.message.includes('uk_customer_email')) {
        return res.status(409).json({ 
          success: false, 
          message: 'Email sudah terdaftar' 
        });
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mendaftarkan customer' 
    });
  }
}

/**
 * POST /api/auth/login
 * Login customer
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Validasi input
    const validationErrors = validateLoginInput({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: validationErrors.join(', ') 
      });
    }
    
    const trimmedEmail = email.trim().toLowerCase();
    
    // Cari customer by email
    const [rows] = await getPool().execute(
      'SELECT * FROM customer WHERE email = ?',
      [trimmedEmail]
    );
    
    if (rows.length === 0) {
      // Generic error message untuk keamanan (tidak leak info apakah email terdaftar)
      return res.status(401).json({ 
        success: false, 
        message: 'Email atau password salah' 
      });
    }
    
    const customer = rows[0];
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, customer.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email atau password salah' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        customer_id: customer.customer_id, 
        username: customer.username, 
        email: customer.email, 
        role: 'customer' 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    // Return response tanpa password_hash
    const { password_hash, ...customerWithoutPassword } = customer;
    
    res.json({
      success: true,
      data: {
        token,
        customer: customerWithoutPassword
      },
      message: 'Login berhasil'
    });
    
  } catch (err) {
    console.error('Error logging in customer:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal login' 
    });
  }
}

/**
 * GET /api/auth/me
 * Get profil customer dari token (memerlukan autentikasi)
 */
async function getProfile(req, res) {
  try {
    // req.user sudah diset oleh middleware authenticate
    const { password_hash, ...customerWithoutPassword } = req.user;
    
    res.json({
      success: true,
      data: customerWithoutPassword
    });
    
  } catch (err) {
    console.error('Error getting profile:', err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil profil' 
    });
  }
}

/**
 * PUT /api/auth/profile
 * Update profil customer (username & foto_profil only)
 * Email tidak bisa diubah sesuai PRD
 */
async function updateProfile(req, res) {
  try {
    const customerId = req.user.customer_id;
    const { username, foto_profil } = req.body;
    
    // Validasi: email tidak boleh diubah
    if (req.body.email !== undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email tidak bisa diubah' 
      });
    }
    
    // Validasi username jika diberikan
    if (username !== undefined) {
      const trimmedUsername = username.trim();
      
      if (!trimmedUsername) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username tidak boleh kosong' 
        });
      }
      
      if (trimmedUsername.length < 3) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username minimal 3 karakter' 
        });
      }
      
      if (trimmedUsername.length > 100) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username maksimal 100 karakter' 
        });
      }
      
      // Cek duplikat username (kecuali milik sendiri)
      const [usernameCheck] = await getPool().execute(
        'SELECT customer_id FROM customer WHERE username = ? AND customer_id != ?',
        [trimmedUsername, customerId]
      );
      
      if (usernameCheck.length > 0) {
        return res.status(409).json({ 
          success: false, 
          message: 'Username sudah digunakan' 
        });
      }
    }
    
    // Build update query dynamically
    const updates = [];
    const params = [];
    
    if (username !== undefined) {
      updates.push('username = ?');
      params.push(username.trim());
    }
    
    if (foto_profil !== undefined) {
      updates.push('foto_profil = ?');
      params.push(foto_profil);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tidak ada field yang valid untuk diperbarui' 
      });
    }
    
    params.push(customerId);
    
    await getPool().execute(
      `UPDATE customer SET ${updates.join(', ')} WHERE customer_id = ?`,
      params
    );
    
    // Ambil data terbaru
    const [rows] = await getPool().execute(
      'SELECT customer_id, username, email, foto_profil FROM customer WHERE customer_id = ?',
      [customerId]
    );
    
    res.json({
      success: true,
      data: rows[0],
      message: 'Profil berhasil diperbarui'
    });
    
  } catch (err) {
    console.error('Error updating profile:', err.message);
    
    if (err.code === 'ER_DUP_ENTRY' && err.message.includes('uk_customer_username')) {
      return res.status(409).json({ 
        success: false, 
        message: 'Username sudah digunakan' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Gagal memperbarui profil' 
    });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};