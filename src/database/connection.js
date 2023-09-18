import sql from "mssql";

const dbSettings = {
  user: "isdbuser",
  password: "$1C8l7//np6B",
  server: "localhost",
  database: "IntelliSys_DB",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

export { sql };