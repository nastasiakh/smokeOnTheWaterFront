import {RoleModel} from "./RoleModel";

export interface UserModel {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  roles?: RoleModel[];
}
