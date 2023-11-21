import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductVariant } from '../../products/entity/product_variant.entity';

@Entity('image_show')
export class ImageShow {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    length: 255,
  })
  image: string;

  //xác định nhiều ảnh cho 1 sản phẩm
  @ManyToOne(() => ProductVariant, (prod_var) => prod_var.image_shows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'prod_variant_id',
  })
  prod_variant: ProductVariant;
}
