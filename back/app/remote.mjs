import { request } from 'node:https'
import { Buffer } from 'node:buffer'

/**
 * @param {String} itn 
 * @returns {Promise<Object>}
 */
export const fetch = async itn => new Promise(req.bind(this, itn))

/**
 * @param {String} itn 
 * @param  {...Function} stuff [ok, fail]
 */
function req(itn, ...stuff) {
    const r = request(
        {
            hostname: 'suggestions.dadata.ru',
            path: '/suggestions/api/4_1/rs/findById/party',
            method: 'POST',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${process.env.DADATATOKEN}`,
            },
        },
        resp.bind(this, ...stuff)
    )

    r.on('error', stuff[1])
    r.write(JSON.stringify({ query: itn }))
    r.end()
}

/**
 * @param {Function} ok 
 * @param {Function} fail 
 * @param {Response} res 
 */
function resp(ok, fail, res) {
    if (res.statusCode !== 200) {
        fail(new Error(`Status code ${res.statusCode}`))
        return
    }

    let buf = Buffer.from('')

    res.on('data', d => buf = Buffer.concat([buf, d]))
    res.on('end', () => {
        let r
        try {
            r = buf.toString()
            r = JSON.parse(r)
            r = r.suggestions
            r = r.map(s => ({ itn: s.data.inn, ...s.data }))
            if (r.length === 1) r = r[0]

            ok(r)
        } catch (e) {
            fail(e)
            return
        }
    })
}