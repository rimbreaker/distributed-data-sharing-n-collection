import express from "express";
import cors from "cors";
import Gun from "gun";
import { initializeDB, putValue } from "./utils/orbitDbInterface";
import setupSwagger from "./utils/swaggerSetup";
import md5 from "md5";
import messagesRouter from "./routes/messagesRouter";
import colorsRouter from "./routes/colorsRouter";
import namer from "color-namer";

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

  app.use("/api", messagesRouter);
  app.use("/api", colorsRouter);

  setupSwagger(app);

  const server = app.listen(port, () => {
    console.log(`example app running at http://localhost:${port}`);
  });

  const gun = Gun({
    web: server,
    radisk: false,
  });

  await initializeDB();

  gun
    .get("messages")
    .map()
    .on((val) => {
      if (val) {
        const { _, ...pureVal } = { ...val } as Record<string, any>;
        putValue({
          type: "message",
          id: md5(JSON.stringify(pureVal)),
          ...pureVal,
        });
      }
    }, true);

  gun
    .get("color")
    .map()
    .on((val) => {
      if (val) {
        const colorData = {
          type: "color",
          color: val,
          name: namer(val).pantone[0].name,
          createdAt: Date.now(),
          colorUrl: `https://singlecolorimage.com/get/${val.slice(1)}/50x50`,
        };

        putValue({
          id: md5(JSON.stringify(colorData)),
          ...colorData,
        });
      }
    }, true);
};

main();
