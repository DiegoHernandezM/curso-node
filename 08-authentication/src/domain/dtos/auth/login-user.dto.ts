import { regularExps } from "../../../config";



export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) { }

  static create(obj: {[key: string]: any}): [string?, LoginUserDto?] {
    const {email, password} = obj;
    if (!email) return ['Email is required'];
     if (!regularExps.email.test(email)) return ['Invalid email format'];
    if (!password) return ['Password is required'];
    return [undefined, new LoginUserDto(email, password)];
  }
}