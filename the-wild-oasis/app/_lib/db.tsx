import sql, { ConnectionPool, config as MSSQLConfig } from "mssql";
import dotenv from "dotenv";
dotenv.config();
let pool: ConnectionPool | null = null;
const config: MSSQLConfig = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_CERTIFICATES === "true",
  },
  authentication: {
    type: "ntlm",
    options: {
      domain: process.env.DB_DOMAIN!,
      userName: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
    },
  },
};
export async function connectToDatabase(): Promise<ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}
