import { Client } from "pg";

const client = new Client({
  user: "CAVORGIA",
  host: "localhost",
  port: 5432,
  password: "Loki3210",
  database: "CAVORGIA",
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Conexão feita.");
};

export { client, startDatabase };
