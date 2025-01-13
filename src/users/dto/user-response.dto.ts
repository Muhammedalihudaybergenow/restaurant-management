import { UserRoleEnum, UserStatusEnum } from 'src/common/enums';
import { UserEntity } from '../entities';

export class UserResponseDto {
  id: number;
  isSuperUser: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phonenumber: number;
  status: UserStatusEnum;
  role: UserRoleEnum;
  validUntil: string;
  createdAt: number;
  constructor(partial: Partial<UserEntity>) {
    if (partial) {
      if (partial.id != undefined) this.id = partial.id;
      if (partial.isSuperUser != undefined)
        this.isSuperUser = partial.isSuperUser;
      if (partial.email != undefined) this.email = partial.email;
      if (partial.firstName != undefined) this.firstName = partial.firstName;
      if (partial.lastName != undefined) this.lastName = partial.lastName;
      if (partial.phonenumber != undefined)
        this.phonenumber = partial.phonenumber;
      if (partial.status != undefined) this.status = partial.status;
      if (partial.role != undefined) this.role = partial.role;
      if (partial.validUntil != undefined) this.validUntil = partial.validUntil;
      if (partial.createdAt != undefined) this.createdAt = partial.createdAt;
    }
  }
}
