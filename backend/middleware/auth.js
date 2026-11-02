const jwt = require('jsonwebtoken');
const { getPool } = require('../config/database');

/**
 * Middleware untuk memverifikasi JWT token
 * Menambahkan req.user dengan data user yang terdekode + data fresh dari DB
 */
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token tidak disediakan' 
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tentukan tabel dan field ID berdasarkan role
    const isAdmin = decoded.role === 'admin';
    const table = isAdmin ? 'admin' : 'customer';
    const idField = isAdmin ? 'admin_id' : 'customer_id';
    const idValue = isAdmin ? decoded.admin_id : decoded.customer_id;

    // Ambil data fresh dari database
    const [rows] = await getPool().execute(
      `SELECT * FROM ${table} WHERE ${idField} = ?`,
      [idValue]
    );

    if (rows.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'User tidak ditemukan' 
      });
    }

    // Gabungkan decoded token dengan data fresh dari DB (tanpa password_hash)
    const userData = rows[0];
    const { password_hash, ...userWithoutPassword } = userData;
    
    req.user = { 
      ...decoded, 
      ...userWithoutPassword 
    };
    
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token kadaluarsa' 
      });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token tidak valid' 
      });
    }
    console.error('Auth middleware error:', err.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal memverifikasi token' 
    });
  }
}

/**
 * Middleware untuk autorisasi berdasarkan role
 * @param {...string} roles - Role yang diizinkan (contoh: 'admin', 'customer')
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Akses ditolak: role tidak mencukupi' 
      });
    }
    next();
  };
}

module.exports = { authenticate, authorize };