import { fetch } from './remote.mjs'
import { insert, select } from './db.mjs'
import { pick } from 'lodash-es'

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
        await insert(itn, company)
        company = { content: company }
    }

    ctx.body = mapCompany(company)
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

function mapCompany(row) {
    return row.content.map(c => ({
        ...pick(c, [
            'kpp',
            'branch_type',
            'branch_count',
            'type',
            'ogrn',
            'okpo',
            'okato',
            'oktmo',
            'okogu',
            'okfs',
            'okved',
            'ogrn_date',
        ]),
        itn: c.inn,
        name: c.name.full,
        name_full: c.name.full_with_opf,
        status: c.state.status,
        actuality_date: c.state.actuality_date,
        registration_date: c.state.registration_date,
        liquidation_date: c.state.liquidation_date,
        address: c.address.unrestricted_value,
    }))
}