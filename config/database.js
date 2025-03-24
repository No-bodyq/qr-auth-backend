import { Sequelize } from "sequelize";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathN = path.resolve(__dirname, "../.env");

console.log(pathN);
config({ path: path.resolve(__dirname, "../.env") });

const env = process.env.NODE_ENV || "development";
const dbConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Sometimes required for hosted DBs like Render
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  
};

const { database, username, password, host, dialect, logging, dialectOptions, pool } = dbConfig[env];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging,
  dialectOptions,
  pool,
});

export default sequelize;
