import path from 'path';
import { fileURLToPath } from 'url';
import pg from "pg";
import env from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config({ path: path.resolve(__dirname, './.env') });

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect().then(() => {
    console.log(`Connected to the database on port ${process.env.PG_PORT}`);
}).catch(err => {
    console.log(`Connection error: ${err}`);
})

export default db 

