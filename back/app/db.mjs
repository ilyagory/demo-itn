import knex from 'knex'

let db
export function connect(){
    db = knex({
        client: 'pg',
        connection: {
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            database: process.env.DBNAME,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
        },
    })
}

/**
 * @param {string} itn
 */
export async function select(itn) {
    return db.from('itns').where('itn', itn).first()
}

/**
 * @param {Object} company
 */
export async function insert(itn, company) {
    return db.insert({ itn, content: JSON.stringify(company) }).into('itns')
}