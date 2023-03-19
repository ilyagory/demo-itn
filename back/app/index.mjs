import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'

import handle from './handlers.mjs'

const app = new Koa
const router = new Router

handle(router)

app.use(cors())
app.use(bodyParser({
    enableTypes: ['json'],
}))
app.use(router.routes())

app.listen(process.env.PORT, () => console.log(`Listen at ${process.env.PORT}`))
