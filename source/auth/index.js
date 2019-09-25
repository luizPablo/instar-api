import 'dotenv/config'

import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

import jwt from 'jsonwebtoken'
import models from '../../models'

module.exports = {
    async login(req, res) {
        const users = models.users

        const user = await users.findOne({
            where: {
                username: req.body.username
            },
            include: [
                { model: models.roles },
            ]
        });

        if (user) {
            if (user.validPassword(req.body.password)) {
                const id = user.id;
                var token = jwt.sign(
                    {
                        sub: id,
                        iss: process.env.ISS,
                        aud: process.env.AUD,
                        exp: moment().add(2, 'hours').unix(),
                        permission: user.role.identifier
                    },
                    process.env.SECRET,
                );

                req.session.stringAccess = token

                return res.json({
                    auth: true,
                    token: token
                });
            } else {
                return res.json({
                    auth: false,
                    message: 'Invalid password'
                });
            }
        }

        return res.json({
            auth: false,
            message: 'User not found'
        });

    },

    logout(req, res) {
        if (req.session) {
            req.session.destroy()
        }

        res.status(200).json({ auth: false })
    },

    verify(req, res, next) {
        if (!req.session) {
            return res.status(200).send({
                auth: false,
                message: 'No token provided'
            })
        }

        jwt.verify(req.session.stringAccess, process.env.SECRET, { audience: process.env.AUD, issuer: process.env.ISS }, function (err, decoded) {
            if (err) {
                return res.status(200).send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                })
            }
            next()
        })
    },
}