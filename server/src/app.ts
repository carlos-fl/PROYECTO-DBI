import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./db/db.connection";
import { sqlConfig } from "./config/db.config";
import { verifyToken } from "./middlewares/authMiddleware";
import { gerenteRouter } from "./routes/gerente.route";
import { ticketsRouter } from "./routes/boletos";
import { salasRouter } from "./routes/salas";
import { clientRouter } from "./routes/client";
import { proyeccionesRouter } from './routes/proyecciones.route';
import { clientProjectionRouter } from './routes/client.projection.route';

dotenv.config();

connectToDatabase(sqlConfig);

const app: Express = express();
const port: string | number = process.env.PORT || 8080;

const FRONTEND_URL: string = process.env.FRONTEND_URL || 'http://localhost:5173';
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/api', proyeccionesRouter);
app.use('/api', clientProjectionRouter);

//AUTORIZACION
app.use('/boletos', ticketsRouter);
app.use("/gerente", gerenteRouter);
app.use('/salas', salasRouter);
app.use('/peliculas', clientRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

app.use(verifyToken);

