import express, { Application, json } from "express";
import { startDatabase } from "./database";
import {
  createMovies,
  deleteMovie,
  listMovies,
  searchMovie,
  updateMovie,
} from "./logic";
import { ensureIdExist, verifyNameExist } from "./middlewares";

const app: Application = express();
const port: number = 3000;

app.use(json());

app.post("/movies", createMovies);
app.get("/movies", listMovies);
app.get("/movies/:id", ensureIdExist, searchMovie);
app.patch("/movies/:id", ensureIdExist, verifyNameExist, updateMovie);
app.delete("/movies/:id", ensureIdExist, deleteMovie);

app.listen(port, async () => {
  await startDatabase();
  console.log(`Server listening at http://localhost:${port}`);
});
