import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductVariant } from './product_variant.entity';
import { Size } from '../../size/entity/size.entity';
import { CartDetail } from '../../carts/entity/cart_detail.entity';

@Entity({
  name: 'product_details',
})
export class ProductDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    type: 'int',
    default: 0,
  })
  sale: number;

  @Column({
    type: 'bigint',
  })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  new_price: number;

  // quan hệ với product_variant
  @ManyToOne(
    () => ProductVariant,
    (productVariant) => productVariant.product_detail,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'product_variant_id',
  })
  prod_variant: ProductVariant;

  //quan hệ với size
  @ManyToOne(() => Size, (size) => size.prod_detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'size_id',
  })
  size: Size;

  // ==================================================================================
  //quan hệ với order

  // quan hệ với cart details là quan hệ 1 nhiều
  @OneToMany(() => CartDetail, (cart_detail) => cart_detail.product, {
    onDelete: 'CASCADE',
  })
  cart_detail: CartDetail[];
}
