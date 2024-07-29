import { Router, Request, Response } from "express";
import sql from "mssql";
import { connectToDatabaseWithWindowsAuth } from "../db/db.connection";
import { config, connetionString, sqlConfigString, configString, configTediusString } from "../config/db.config";

export const gerenteRouter: Router = Router();

gerenteRouter.post("/login", async (req: Request, res: Response) => {
  const user: string = req.body.user;
  if (!user) return res.status(400).json({ message: 'Missing parameters' })
  try {
    const userResult = await new sql.Request().query(
      `SELECT * FROM GERENTES WHERE USUARIO LIKE '${user}'`
    );
    console.log('despues de query')
    return res.status(200).json({
      message: "login successfully",
      data: userResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error while login" });
  }
});

gerenteRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "this was sent from gerenteRouter",
  });
});

