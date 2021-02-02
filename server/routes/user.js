const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const bodyParser = require('body-parser');
const User = require('../models/user');
const { tokenVerification, adminRoleVerification } = require('../middlewares/authorization');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/user', tokenVerification, (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 5;
    to = Number(to);

    // Puedo pasar como string un segundo parámetro que retorne
    // los campos deseados. Ej: 'user email role google status img'
    User.find({ status: true })
        .skip(from)
        .limit(to)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            User.countDocuments({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    total: count
                });
            })
        })
});

app.post('/user', [tokenVerification, adminRoleVerification], urlencodedParser, (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        // img: body.img,
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        })
    })
});

app.put('/user/:id', tokenVerification, jsonParser, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

// app.delete('/user/:id', function(req, res) {

//     let id = req.params.id;
//     User.findByIdAndRemove(id, (err, userDeleted) => {
//         if (err || !userDeleted) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         };
//         res.json({
//             ok: true,
//             user: userDeleted
//         });
//     });
// });

app.delete('/user/:id', (req, res) => {

    let id = req.params.id;

    User.findByIdAndUpdate(id, { status: false }, { new: true }, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });
});

module.exports = app;