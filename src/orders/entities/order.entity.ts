import { OrderTypeEntity } from 'src/order-types/entities';
import { RestaurantEntity } from 'src/restaurants/entities';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class OrderEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    name: 'full_name',
    type: 'varchar',
    nullable: false,
  })
  fullName: string;
  @Column({
    name: 'phonenumber',
    type: 'varchar',
    nullable: false,
  })
  phonenumber: string;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'comment',
    type: 'text',
    nullable: false,
  })
  comment: string;

  @Column({
    name: 'date',
    type: 'date',
    nullable: false,
  })
  date: string;

  @Column({
    name: 'start_time',
    type: 'bigint',
    nullable: false,
  })
  startTime: number;

  @Column({
    name: 'end_time',
    type: 'bigint',
    nullable: false,
  })
  endTime: number;

  @Column({
    name: 'chair_count',
    type: 'integer',
    nullable: false,
  })
  chairCount: number;

  @Column({
    name: 'price',
    type: 'float',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'order_type_name',
    type: 'varchar',
    nullable: false,
  })
  orderTypeName: string;

  @Column({
    name: 'order_type_id',
    type: 'integer',
    nullable: false,
  })
  orderTypeId: number;

  @ManyToOne(() => OrderTypeEntity, (orderType) => orderType.id)
  @JoinColumn({
    name: 'order_type_id',
    referencedColumnName: 'id',
  })
  orderType: OrderTypeEntity;
  @Column({
    name: 'created_at',
    type: 'bigint',
    nullable: false,
  })
  createdAt: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'status',
  })
  status: string;
  @Column({
    type: 'integer',
    name: 'restaurant_id',
    nullable: false,
    select: false,
  })
  restaurantId: number;
  @Column({
    name: 'created_by_id',
    type: 'integer',
    nullable: false,
  })
  createdById: number;

  @Column({
    name: 'updated_by_id',
    type: 'integer',
    nullable: false,
    select: false,
  })
  updatedById: number;

  @ManyToOne(() => UserEntity, (updatedBy) => updatedBy.id)
  @JoinColumn({
    name: 'updated_by_id',
    referencedColumnName: 'id',
  })
  updatedBy: UserEntity;
  @ManyToOne(() => UserEntity, (createdBy) => createdBy.id)
  @JoinColumn({
    name: 'created_by_id',
    referencedColumnName: 'id',
  })
  createdBy: UserEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orders)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'restaurant_id',
  })
  restaurant: RestaurantEntity;
  constructor(partial?: Partial<OrderEntity>) {
    if (partial) {
      if (partial.chairCount !== undefined)
        this.chairCount = partial.chairCount;
      if (partial.comment !== undefined) this.comment = partial.comment;
      if (partial.createdAt !== undefined) this.createdAt = partial.createdAt;
      if (partial.createdBy !== undefined) this.createdBy = partial.createdBy;
      if (partial.createdById !== undefined)
        this.createdById = partial.createdById;
      if (partial.date !== undefined) this.date = partial.date;
      if (partial.id !== undefined) this.id = partial.id;
      if (partial.note !== undefined) this.note = partial.note;
      if (partial.orderTypeName !== undefined)
        this.orderTypeName = partial.orderTypeName;
      if (partial.phonenumber !== undefined)
        this.phonenumber = partial.phonenumber;
      if (partial.price !== undefined) this.price = partial.price;
      if (partial.startTime !== undefined) this.startTime = partial.startTime;
      if (partial.endTime !== undefined) this.endTime = partial.endTime;
      if (partial.restaurant !== undefined)
        this.restaurant = partial.restaurant;
      if (partial.restaurantId !== undefined)
        this.restaurantId = partial.restaurantId;
      if (partial.updatedById !== undefined)
        this.updatedById = partial.updatedById;
      if (partial.updatedBy !== undefined) this.updatedBy = partial.updatedBy;
      if (partial.fullName !== undefined) this.fullName = partial.fullName;
      if (partial.status !== undefined) this.status = partial.status;
      if (partial.orderTypeId !== undefined)
        this.orderTypeId = partial.orderTypeId;
    }
  }
}
