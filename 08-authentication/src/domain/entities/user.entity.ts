import { CustomError } from "../errors/custom.errors";


export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly emailVerified: boolean,
    public readonly password: string,
    public readonly img?: string,
    public readonly role?: string[],
  ) {}

  static fromObject(obj: any) {
    const { id, _id, name, email, emailVerified, password, img, role } = obj;
    if (!_id && !id) throw CustomError.badRequest('Miss id field');
    if(!name) throw CustomError.badRequest('Miss name field');
    if(!email) throw CustomError.badRequest('Miss email field');
    if(emailVerified === undefined) throw CustomError.badRequest('Miss emailVerified field');
    if(!password) throw CustomError.badRequest('Miss password field');
    if(!role) throw CustomError.badRequest('Miss role field');
    
    return new UserEntity(
      id || _id,
      name,
      email,
      emailVerified,
      password,
      img,
      role,
    );
  }
}