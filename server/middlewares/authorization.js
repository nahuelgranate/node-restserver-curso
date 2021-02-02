const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

// ============================
// Verify token
// ============================

let tokenVerification = ( req, res, next ) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.user = decoded.user;
        next();
    });
};

// ============================
// Verify AdminRole
// ============================

let adminRoleVerification = ( req, res, next ) => {
    let user = req.user;
    
    if(user.role === 'ADMIN_ROLE'){
        next();
    }
    else {
        return res.json({
            ok: false,
            err: {
                message: "Role is not valid"
            }
        })
    }
};

module.exports = {
    tokenVerification,
    adminRoleVerification
}