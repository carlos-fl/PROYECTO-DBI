import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./db/db.connection";
import { gerenteRouter } from "./routes/gerente.route";
import { sqlConfig } from "./config/db.config";

dotenv.config();

connectToDatabase(sqlConfig);

const app: Express = express();
const port: string | number = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/gerente", gerenteRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
