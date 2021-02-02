// ====================================
// Port
// ====================================

process.env.PORT = process.env.PORT || 3000;

// ====================================
// Environment
// ====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================================
// Expiration
// ====================================

process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// ====================================
// Seed
// ====================================

process.env.SEED = process.env.SEED || 'seed-token-development'

// ====================================
// Database
// ====================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.DB_URI;
}

process.env.DATABASE = urlDB;