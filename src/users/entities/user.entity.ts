import { UserRoleEnum, UserStatusEnum } from 'src/common/enums';
import { RestaurantEntity } from 'src/restaurants/entities';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phonenumber',
    type: 'integer',
    nullable: false,
  })
  phonenumber: number;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
    select: false,
  })
  password: string;
  @Column({
    name: 'is_super_user',
    type: 'boolean',
    nullable: false,
  })
  isSuperUser: boolean;

  @Column({
    name: 'valid_until',
    type: 'date',
    nullable: false,
  })
  validUntil: string;

  @Column({
    name: 'role',
    type: 'varchar',
    nullable: false,
  })
  role: UserRoleEnum;

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
  })
  status: UserStatusEnum;
  @Column({
    name: 'created_at',
    type: 'bigint',
    nullable: false,
  })
  createdAt: number;

  @OneToMany(() => RestaurantEntity, (restaurants) => restaurants.user)
  restaurants: RestaurantEntity[];
  @VirtualColumn({
    query: () =>
      '(select coalesce (count(*),0) from restaurants rc where rc.user_id = u.id)',
  })
  restaurantCount: number;
  constructor(partial?: Partial<UserEntity>) {
    if (partial) {
      if (partial.createdAt !== undefined) this.createdAt = partial.createdAt;
      if (partial.email !== undefined) this.email = partial.email;
      if (partial.firstName !== undefined) this.firstName = partial.firstName;
      if (partial.id !== undefined) this.id = partial.id;
      if (partial.isSuperUser !== undefined)
        this.isSuperUser = partial.isSuperUser;
      if (partial.lastName !== undefined) this.lastName = partial.lastName;
      if (partial.password !== undefined) this.password = partial.password;
      if (partial.phonenumber !== undefined)
        this.phonenumber = partial.phonenumber;
      if (partial.status !== undefined) this.status = partial.status;
      if (partial.role !== undefined) this.role = partial.role;
      if (partial.validUntil !== undefined)
        this.validUntil = partial.validUntil;
      if (partial.restaurants !== undefined)
        this.restaurants = partial.restaurants;
    }
  }
}
