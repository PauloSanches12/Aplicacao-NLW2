import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'sqlite',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default db;