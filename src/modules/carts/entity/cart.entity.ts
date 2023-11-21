import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { CartDetail } from './cart_detail.entity';

@Entity({
  name: 'carts',
})
export class Carts {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  _id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    default: 0,
  })
  total: number;

  @OneToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => CartDetail, (cart) => cart.cart, {
    onDelete: 'CASCADE',
  })
  cart_detail: CartDetail[];
}
