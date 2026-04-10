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

  static verifyToken(token: string): any {
    return jwt.verify(token, '123456');
  }
}