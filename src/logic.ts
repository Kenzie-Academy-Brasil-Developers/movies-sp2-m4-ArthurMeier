import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IMovie, MovieCreate } from "./interfaces";
import { client } from "./database";
import format from "pg-format";

const createMovies = async (req: Request, res: Response): Promise<Response> => {
  const movieData: MovieCreate = req.body;

  const queryString: string = format(
    `
    INSERT INTO
        movies
        (%I)
        VALUES
        (%L)
        RETURNING *;
    `,
    Object.keys(movieData),
    Object.values(movieData)
  );

  const queryResult: QueryResult<MovieCreate> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const listMovies = async (req: Request, res: Response): Promise<Response> => {
  const queryString: string = `
    SELECT
        *
    FROM 
        movies;
  `;

  const queryResult: QueryResult<IMovie> = await client.query(queryString);

  return res.json(queryResult.rows);
};

const searchMovie = async (req: Request, res: Response): Promise<Response> => {
  const movie: IMovie = res.locals.movie;

  return res.json(movie);
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const movieData: Partial<MovieCreate> = req.body;
  const id: number = parseInt(req.params.id);

  const queryString: string = format(
    `
      UPDATE
          movies
          SET(%I) = ROW(%L)
      WHERE
          id = $1
        RETURNING *;
  `,
    Object.keys(movieData),
    Object.values(movieData)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IMovie> = await client.query(queryConfig);

  return res.json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    DELETE FROM
        movies
    WHERE
        id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);

  return res.status(204).send();
};

export { createMovies, listMovies, searchMovie, updateMovie, deleteMovie };
