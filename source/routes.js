import express from 'express'
import auth from './auth'
import graphlHTTP from 'express-graphql'
import schema from './graphql/schema'
import jwt from 'jsonwebtoken'

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.json({
        Message: 'Welcome! This api is work fine...'
    })
});

// authentication
routes.post('/auth', auth.login)

// logout
routes.get('/logout', auth.verify, auth.logout)

// isAuth?
routes.get('/isauth', auth.verify, (req, res) => {
    res.status(200).json({
        auth: true,
    })
})

// graphql layer
routes.use('/graphql', auth.verify, graphlHTTP((req, res) => ({
    schema: schema,
    graphiql: true,
    rootValue: jwt.decode(req.session.stringAccess),
})))

module.exports = routes
