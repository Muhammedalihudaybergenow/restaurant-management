import { FileInterface } from 'src/common/interfaces';
import { OrderEntity } from 'src/orders/entities';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

@Entity({
  name: 'restaurants',
})
export class RestaurantEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  file: FileInterface;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false,
    select: false,
  })
  userId: number;

  @VirtualColumn({
    query: () =>
      '(select coalesce (count(*),0) from orders o where o.restaurant_id = r.id)',
  })
  orderCount: number;

  @ManyToOne(() => UserEntity, (user) => user)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.restaurant)
  orders: OrderEntity[];
  constructor(partial?: Partial<RestaurantEntity>) {
    if (partial) {
      if (partial.id !== undefined) this.id = partial.id;
      if (partial.file !== undefined) this.file = partial.file;
      if (partial.name !== undefined) this.name = partial.name;
      if (partial.user !== undefined) this.user = partial.user;
      if (partial.slug !== undefined) this.slug = partial.slug;
      if (partial.userId !== undefined) this.userId = partial.userId;
    }
  }
}
