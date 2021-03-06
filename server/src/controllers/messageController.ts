import { Request, Response } from "express";
import { deleteValue, queryForValue } from "../utils/orbitDbInterface";

const getAllMessages = async (_: Request, res: Response) => {
  const data = await queryForValue((doc) => doc.type === "message");
  const range = data.length;
  res.header("content-range", `posts 0-${range}/${range}`);
  res.send(data);
};

const deleteMessage = async (req: Request, res: Response) => {
  const id = req.params.id;
  const hash = await deleteValue(id);
  res.send({ id: hash });
};

export { getAllMessages, deleteMessage };
