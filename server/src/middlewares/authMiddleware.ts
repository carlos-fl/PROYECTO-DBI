import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.access_token
  if (!token) return res.status(401).json({ message: 'unathorized' })
  try {
    const SECRET_KEY: string = process.env.SECRET_KEY || 'secret-key-prueba' 
    const payload = jwt.verify(token, SECRET_KEY)
    if (payload) {
      (req as CustomRequest).token = payload;
      next();
    }
  } catch(err) {
    return res.status(500).json({ message: 'error while handling cookies' })
  }
}