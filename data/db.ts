import knex from 'knex';
import knexfile from '../knexfile';

const env: 'development' | 'testing' | 'production' = process.env.NODE_ENV as any || 'development';
const configOptions = knexfile[env];

export default knex(configOptions);
