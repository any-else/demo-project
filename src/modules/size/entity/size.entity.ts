import { ProductDetail } from './../../products/entity/product_details.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'size',
})
export class Size {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    length: 255,
  })
  size_name: string;

  @OneToMany(() => ProductDetail, (prod_detail) => prod_detail.size, {
    onDelete: 'CASCADE',
  })
  prod_detail: ProductDetail[];
}
