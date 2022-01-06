import { create } from "ipfs-http-client";

let db: any;

export const initializeDB = async () => {
  const OrbitDB = require("orbit-db");

  const ipfs = await create({
    host: "127.0.0.1",
    port: 5001,
    protocol: "http",
  });

  const orbitdb = await OrbitDB.createInstance(ipfs);

  db = await orbitdb.docs("messenges2", {
    indexBy: "id",
  });
  await db.load();

  return db;
};

export const putValue = async (object: Record<string, unknown>) => {
  await db.put(object);
};

export const getAllValues = async () => {
  return await db.get("");
};

export const getOneValue = async (id: string) => {
  return db.get(id);
};

export const queryForValue = async (
  queryFunc: (doc: Record<string, unknown>) => boolean
) => {
  return db.query(queryFunc);
};

export const deleteValue = async (id: string) => {
  return await db.del(id);
};
