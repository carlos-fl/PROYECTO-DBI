import * as dotenv from 'dotenv'

dotenv.config()

const user: string = process.env.DB_USER || "";
const password: string = process.env.DB_PWD || "";
const database: string = process.env.DB_NAME || "";
const server: string = process.env.SERVER || "";

export const sqlConfig = {
  user,
  password,
  database,
  server,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const config = {
  server,
  database,
  options: {
    trustedConnection: true, // Set to true if using Windows Authentication
    //trustServerCertificate: false, // Set to true if using self-signed certificates
  },
  driver: "msnodesqlv8", // Required if using Windows Authentication
};
