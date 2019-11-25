import { Role } from './role';

export class User {
  public constructor(
    public username: string,
    public password: string,
    public email: string,
    public phone: string,
    public fname: string,
    public lname: string,
    public mname: string,
    public enabled: boolean,
    public accountNonExpired: boolean,
    public credentialsNonExpired: boolean,
    public accountNonLocked: boolean,
    public roles: Role[],

  ) { }
}
