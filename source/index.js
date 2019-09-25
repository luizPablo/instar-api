import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import uuid from 'uuid/v4'
import routes from './routes'
import models from '../models'

const PORT = 5050
const app = express()

app.set('trust proxy', 1)
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true
}))

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const myStore = new SequelizeStore({
    db: models.sequelize
})

app.use(session({
    genid: req => {
        return uuid()
    },
    store: myStore,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    secret: process.env.SECRET,
    name: 'farmalic-session',
    cookie: {
        expires: 120 * 60000,
    }
}))

app.use(helmet())

models.sequelize.sync().then(function () {
    console.log('Database is work fine!')
}).catch(function (err) {
    console.log(err, 'Something wrong! :(')
})

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})
