import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { ProductDetail } from '../../products/entity/product_details.entity';
// import { Payment } from '../../payment/entity/payment.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column()
  quantity: number;

  // @Column()
  // product: ProductDetail;

  // @Column()
  // payment: Payment;

  @Column()
  totalPrice: number;

  @Column()
  createAt: Date;
}
