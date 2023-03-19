async function request(path, opt, body) {
    const url = new URL(path, import.meta.env.VITE_BACKEND)

    if (!opt.method) opt.method = 'GET'

    if (body !== undefined) {
        if (opt.method === 'GET') {
            for (const [k, v] of Object.entries(body)) {
                url.searchParams.append(k, v)
            }
        } else {
            opt.body = JSON.stringify(body)
        }
    }

    let resp = await fetch(url.href, {
        ...opt,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    if (!resp.ok) throw new Error(resp.statusText)

    if ([201, 204].includes(resp.status)) return

    return resp.json()
}

export default {
    get: (path, query) => request(path, { method: 'GET' }, query),
}