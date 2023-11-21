import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Carts } from '../../carts/entity/cart.entity';

@Entity({
  name: 'users',
})
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    default: 'other',
  })
  gender: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    // unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false, //có thể null hay không
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'user',
  })
  role: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'https://picsum.photos/200/300',
  })
  photo: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: string;

  //thường ae sẽ làm giỏ hàng ở phía bên client(react) nhưng e nghĩ lên làm ở server cũng oke
  @OneToOne(() => Carts, (cart) => cart.user, {
    onDelete: 'CASCADE',
  })
  cart: Carts;
}
