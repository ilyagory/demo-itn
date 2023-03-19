import { fetch } from './remote.mjs'
import { insert, insertArray, select } from './db.mjs'

/**
 * @param {import('@koa/router')}
 */
export default router => {
    router.get('/search', search)
}

/**
 * @param {import('koa').Context} ctx 
 */
async function search(ctx) {
    const itn = String(ctx.query.itn).trim()

    if (!itnValidation(itn)) ctx.throw(400, 'В ИНН ошибка')

    let company = await select(itn)

    if (!company) {
        company = await fetch(itn)

        if(Array.isArray(company)) {
            await insertArray(company)
            company = company[0]
        } else {
            await insert(company)
        }
    }

    ctx.body = company
}

/**
 * 
 * @param {String} itn 
 * @returns {Boolean}
 */
function itnValidation(itn) {
    if (itn.length < 10 && itn.length > 12) return false

    for (let char of itn) {
        if (isNaN(Number(char))) return false
    }

    return true
}