/* export const sqlConfig = {
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
 */


export interface sqlConfig {
  user: String,
  password: String,
  database: String,
  server: String,
  pool: Object,
  options: Object
}

/* export const config = {
  server,
  database,
  options: {
    trustedConnection: true, // Set to true if using Windows Authentication
    trustServerCertificate: true, // Set to true if using self-signed certificates
  },
  driver: "msnodesqlv8", // Required if using Windows Authentication
};
 */
export interface config {
  server: String,
  database: String,
  options: Object,
  driver: String
}
