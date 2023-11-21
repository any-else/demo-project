import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../products/entity/product.entity';

@Entity({
  name: 'brands',
})
export class Brands {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  _id: number;

  @Column({
    length: 255,
    nullable: false,
  })
  brand_name: string;

  @Column({
    length: 255,
    nullable: true,
  })
  image_brand: string;

  //xác định mối quan hệ
  @OneToMany(() => Product, (product) => product.brand, {
    onDelete: 'CASCADE',
  })
  products: Product[];
}
