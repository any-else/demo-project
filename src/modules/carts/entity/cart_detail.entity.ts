import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './cart.entity';
import { ProductDetail } from '../../products/entity/product_details.entity';

@Entity({
  name: 'cart_detail',
})
export class CartDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  //số lượng

  @Column()
  quantity: number;

  //giá tiền

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: number;

  // quan hệ nhiều một tới cart (ae hiểu đơn giản là một cái giỏ hàng của ae có thể chứa nhiều cái sản phẩm mua hàng của các shop khác nhau)
  @ManyToOne(() => Carts, (cart) => cart.cart_detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'cart_id',
  })
  cart: Carts;

  //quan hệ nhiều một với sản phẩm ( có phải là 1 giỏ hàng ae có thể chứa được nhiều sản phẩm đúng chưa nhưng mà ae chú ý product ở đây là product thực thể yếu vì xung quanh product còn nhiều cái thực thể khác như màu sắc side)
  @ManyToOne(() => ProductDetail, (prod_detail) => prod_detail.cart_detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'prod_detail_id',
  })
  product: ProductDetail;
}
