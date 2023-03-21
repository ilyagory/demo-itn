import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { readFileSync } from 'node:fs'

import {connect} from './db.mjs'
import handler from './handler.mjs'

if (process.env.NODE_ENV !== 'development') {
    process.env.DBPASSWORD = readFileSync(process.env.DBPASSWORD_FILE)
    process.env.DADATATOKEN = readFileSync(process.env.DADATATOKEN_FILE)
}

const app = new Koa
const router = new Router

connect()
handler(router)

app.use(cors())
app.use(bodyParser({
    enableTypes: ['json'],
}))
app.use(router.routes())

app.listen(process.env.PORT, () => console.log(`Listen at ${process.env.PORT}`))
