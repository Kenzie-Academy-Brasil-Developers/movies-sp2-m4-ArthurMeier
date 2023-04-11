import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { IMovie } from "./interfaces";
import { client } from "./database";

const ensureIdExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
        *
    FROM
        movies
    WHERE
        id=$1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IMovie> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({ error: "Movie not Found" });
  }

  res.locals.movie = queryResult.rows[0];

  return next();
};

const verifyNameExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  const queryTemplate: string = `
  SELECT
      name
  FROM
      movies
  WHERE
      name = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryTemplate,
    values: [name],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  const foundMovie: IMovie = queryResult.rows[0];

  if (foundMovie) {
    return res.status(409).json({ error: "Movie name already exists!" });
  }

  return next();
};

export { ensureIdExist, verifyNameExist };
