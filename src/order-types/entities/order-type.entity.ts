import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order_types',
})
export class OrderTypeEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
  })
  isActive: boolean;

  @Column({
    name: 'price',
    type: 'float',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'restaurant_id',
    type: 'integer',
    nullable: false,
    select: false,
  })
  restaurantId: number;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.id)
  @JoinColumn({
    name: 'restaurant_id',
    referencedColumnName: 'id',
  })
  restaurant: RestaurantEntity;
  constructor(partial?: Partial<OrderTypeEntity>) {
    if (partial) {
      if (partial.id !== undefined) this.id = partial.id;
      if (partial.isActive !== undefined) this.isActive = partial.isActive;
      if (partial.name !== undefined) this.name = partial.name;
      if (partial.price !== undefined) this.price = partial.price;
      if (partial.restaurant !== undefined)
        this.restaurant = partial.restaurant;
      if (partial.restaurantId !== undefined)
        this.restaurantId = partial.restaurantId;
    }
  }
}
