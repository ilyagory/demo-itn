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
            ...reqOptions(),
            timeout: 3000,
        },
        resp.bind(this, ...stuff)
    )

    r.on('error', stuff[1])
    const body = reqBody(itn)
    if (body) r.write(body)
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
        try {
            let r = buf.toString()
            r = resParse(r)
            ok(r)
        } catch (e) {
            fail(e)
            return
        }
    })
}

function reqOptions() {
    return {
        hostname: 'suggestions.dadata.ru',
        path: '/suggestions/api/4_1/rs/findById/party',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${process.env.DADATATOKEN}`,
        },
    }
}
function reqBody(itn) {
    return JSON.stringify({ query: itn })
}
function resParse(body) {
    let r = JSON.parse(body)

    r = r.suggestions.map(s=>s.data)
    
    return r
}