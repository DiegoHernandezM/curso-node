import { regularExps } from '../../../config';



export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(obj: {[key: string]: any}): [string?, RegisterUserDto?] {
    const { name, email, password } = obj;
    if (!name) return ['Miss name field'];
    if (!email) return ['Miss email field'];
    if (!regularExps.email.test(email)) return ['Invalid email format'];
    if (!password) return ['Miss password field'];
    return [undefined, new RegisterUserDto(name, email, password)];
  }
}