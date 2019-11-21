
export class User {
  public constructor(
    public username: string,
    public phone: string,
    public email: string,
    public password: string,
    public fname: string,
    public lname: string,
    public mname: string,
    public notification_token: string,
    public app_id: string,
    public enabled: boolean,
    public accountNonExpired: boolean,
    public credentialsNonExpired: boolean,
    public accountNonLocked: boolean,
    public roles: string,

  ) { }
}
