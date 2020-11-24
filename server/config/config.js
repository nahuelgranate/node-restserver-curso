// ====================================
// Port
// ====================================

process.env.PORT = process.env.PORT || 3000;

// ====================================
// Environment
// ====================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================================
// Database
// ====================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://nahuelgranate:czVlb7n4b62x9GGm@cluster0.zcgq3.mongodb.net/cafe'
}

process.env.DATABASE = urlDB;