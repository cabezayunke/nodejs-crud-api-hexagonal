const path = require('path')
const env = process.env.NODE_ENV || 'local';
const configPath = path.resolve(process.cwd(), 'config', `./.env.db.${env}`);
require('dotenv').config({ path: configPath });

const dbConfig = {
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   port: process.env.DB_PORT,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
};
module.exports = dbConfig;
