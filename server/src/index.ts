import express from "express";
import cors from "cors";
import Gun from "gun";
import { initializeDB, putValue } from "./utils/orbitDbInterface";
import setupSwagger from "./utils/swaggerSetup";
import allRouter from "./routes/allRouter";
import md5 from "md5";

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "*",
      exposedHeaders: "Content-Range",
    })
  );
  app.use(express.json());
  const port = 3030;

  app.use("/api", allRouter);

  setupSwagger(app);

  const server = app.listen(port, () => {
    console.log(`example app running at http://localhost:${port}`);
  });

  const gun = Gun({
    web: server,
  });

  await initializeDB();

  gun
    .get("messages")
    .map()
    .on((val) => {
      if (val) {
        const { _, ...pureVal } = { ...val } as Record<string, any>;
        putValue({ id: md5(JSON.stringify(pureVal)), ...pureVal });
      }
    });
};

main();
