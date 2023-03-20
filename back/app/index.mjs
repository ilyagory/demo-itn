import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import handler from './handler.mjs'

const app = new Koa
const router = new Router

handler(router)

app.use(cors())
app.use(bodyParser({
    enableTypes: ['json'],
}))
app.use(router.routes())

app.listen(process.env.PORT, () => console.log(`Listen at ${process.env.PORT}`))
