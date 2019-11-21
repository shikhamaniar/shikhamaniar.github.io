import { Permission } from './permission';

export class Role {
  public constructor(
    public name: string,
    public permission: []
  ) { }
}
