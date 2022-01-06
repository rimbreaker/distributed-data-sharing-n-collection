import { Request, Response } from "express";
import {
  getAllValues,
  getOneValue,
  deleteValue,
} from "../utils/orbitDbInterface";

const getAllEntities = async (_: Request, res: Response) => {
  const data = await getAllValues();
  const range = data.length;
  res.header("content-range", `posts 0-${range}/${range}`);
  res.send(data);
};

const getEntityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const entity = await getOneValue(id);
  res.send(entity);
};

const removeEntityById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const hash = await deleteValue(id);
  res.send({ id: hash });
};

export { getAllEntities, getEntityById, removeEntityById };
