import { Request, Response } from "express";

const getAllMessages = (_: Request, res: Response) => {
  const data = [{ test: "test" }];
  res.send(data);
};

const getMessageById = (req: Request, res: Response) => {
  const id = req.params.id;
  const entity = { test: id };
  res.send(entity);
};

const putMessage = (req: Request, res: Response) => {
  const entity: any = { ...req.body };
  console.log(entity);
  res.json({ success: true });
};
const deleteMessage = (req: Request, res: Response) => {
  const id = req.params.id;
  const entity = { test: id };
  console.log(entity);
  res.json({ success: true });
};

export { getAllMessages, getMessageById, putMessage, deleteMessage };
