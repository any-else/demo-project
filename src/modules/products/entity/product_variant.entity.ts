import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductDetail } from './product_details.entity';
import { Color } from '../../color/entity/color.entity';
import { ImageShow } from '../../imageshow/entity/imageshow.entity';

@Entity({
  name: 'product_variant',
})
export class ProductVariant {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  // liên kết với product nhiều => một
  @ManyToOne(() => Product, (prod) => prod.product_variant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  //liên kết với  color Nhiều => một
  @ManyToOne(() => Color, (color) => color.prod_variant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'color_id',
  })
  color: Color;

  // liên kết với image 1 nhiều
  @OneToMany(() => ImageShow, (img_show) => img_show.prod_variant, {
    onDelete: 'CASCADE',
  })
  image_shows: ImageShow[];

  // liên kết với bảng product details 1 => nhiều
  @OneToMany(() => ProductDetail, (prod) => prod.prod_variant, {
    onDelete: 'CASCADE',
  })
  product_detail: ProductDetail[];
}
