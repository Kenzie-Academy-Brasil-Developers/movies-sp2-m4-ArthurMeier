import { Client } from "pg";

const client = new Client({
  user: "Cavorgia",
  host: "localhost",
  port: 5432,
  password: "1234",
  database: "sp2_m4",
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Conexão feita.");
};

export { client, startDatabase };
