import knex from 'knex'

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        database: process.env.DBNAME,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
    }
})

/**
 * @param {string} itn
 */
export async function select(itn) {
    return db.from('itns').where('itn', itn).first()
}

/**
 * @param {Object} company
 */
export async function insert(company) {
    return db.insert({ itn: company.itn, content: company }).into('itns')
}

/**
 * @param {Object[]} all 
 */
export async function insertArray(all) {
    db.transaction(async tx => {
        try {
            await Promise.all(
                all.map(
                    company => insert(company)
                )
            )
            tx.commit()
        } catch (e) {
            tx.rollback(e)
        }
    })
}