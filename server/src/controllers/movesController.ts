import { Request, Response } from "express";

const getAllMoves = (_: Request, res: Response) => {
  const data = [{ test: "test" }];
  res.send(data);
};

const getMoveById = (req: Request, res: Response) => {
  const id = req.params.id;
  const entity = { test: id };
  res.send(entity);
};

const putMove = (req: Request, res: Response) => {
  const entity: any = { ...req.body };
  console.log(entity);
  res.json({ success: true });
};
const deleteMove = (req: Request, res: Response) => {
  const id = req.params.id;
  const entity = { test: id };
  console.log(entity);
  res.json({ success: true });
};

export { getAllMoves, getMoveById, putMove, deleteMove };
