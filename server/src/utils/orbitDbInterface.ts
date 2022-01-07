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

  db = await orbitdb.docs("distributed", {
    indexBy: "id",
  });
  await db.load();
  console.log("IPFS database available at: " + db.address);

  return db;
};

export const putValue = async (object: Record<string, unknown>) => {
  const entityHref = await db.put(object);
  console.log("new data's hash: " + entityHref);
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
