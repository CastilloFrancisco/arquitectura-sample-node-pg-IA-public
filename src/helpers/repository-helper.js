import Db from '../repositories/db-pg.js';

const buildInsertSql = (table, columns) => {
    return `INSERT INTO ${table} (${columns.join(', ')})
            VALUES (${columns.map((_, index) => `$${index + 1}`).join(', ')})
            RETURNING id`;
};

const buildUpdateSql = (table, columns) => {
    return `UPDATE ${table}
            SET ${columns.map((column, index) => `${column} = $${index + 2}`).join(', ')}
            WHERE id = $1`;
};

const RepositoryHelper = {

    getAllAsync: async (table) => {
        const db = new Db();

        const sql = `SELECT * FROM ${table}`;

        return await db.queryAll(sql);
    },

    getByIdAsync: async (table, id) => {
        const db = new Db();

        const sql = `SELECT * FROM ${table} WHERE id=$1`;

        return await db.queryOne(sql, [id]);
    },

    createAsync: async (table, columns, values) => {
        const db = new Db();

        const sql = buildInsertSql(table, columns);

        return await db.queryReturnId(sql, values);
    },

    updateAsync: async (table, columns, values) => {
        const db = new Db();

        const sql = buildUpdateSql(table, columns);

        return await db.queryRowCount(sql, values);
    },

    deleteByIdAsync: async (table, id) => {
        const db = new Db();

        const sql = `DELETE FROM ${table} WHERE id=$1`;

        return await db.queryRowCount(sql, [id]);
    }

};

export default RepositoryHelper;