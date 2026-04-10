import jwt from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {
  constructor(
  ) { }

  static async generateToken(payload: any, duration: string = '2h'): Promise<string> {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration as any }, (err, token) => {
        if (err) return resolve('');
          resolve(token || '');
      });
    })
  }

  static verifyToken(token: string): Promise<any> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as string);
      });
    })
  }
}