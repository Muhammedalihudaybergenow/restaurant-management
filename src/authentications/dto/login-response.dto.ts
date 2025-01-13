import { UserRoleEnum, UserStatusEnum } from 'src/common/enums';
import { TokenResponseDto } from './token-response.dto';
import { UserEntity } from 'src/users/entities';
import { TokenInterface } from '../interfaces';
import { RestaurantEntity } from 'src/restaurants/entities';

export class LoginResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  createdAt: number;
  email: string;
  phonenumber: number;
  isSuperUser: boolean;
  validUntil: string;
  restaurants: RestaurantEntity[];
  tokens: TokenResponseDto;

  constructor(user: UserEntity, tokens: TokenInterface) {
    if (user) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.role = user.role;
      this.status = user.status;
      this.createdAt = user.createdAt;
      this.email = user.email;
      this.phonenumber = user.phonenumber;
      this.isSuperUser = user.isSuperUser;
      this.validUntil = user.validUntil;
      this.restaurants = user.restaurants;
    }
    if (tokens) {
      this.tokens = new TokenResponseDto({
        access: tokens.access,
        refresh: tokens.refresh,
      });
    }
  }
}
