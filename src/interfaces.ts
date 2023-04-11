import { QueryResult } from "pg";

export interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type MovieCreate = Omit<IMovie, "id">;
export type MovieResult = QueryResult<IMovie>;
