import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brands } from '../../brands/entity/brands.entity';
import { CateGory } from '../../category/entity/category.entity';
import { ProductVariant } from './product_variant.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    length: 255,
    nullable: true,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    length: 255,
    nullable: true,
  })
  product_image: string;

  @Column({
    default: false,
  })
  available: boolean;

  @Column({
    length: 255,
    nullable: true,
  })
  material: string;

  // @Column({
  //   nullable: true,
  // })
  // slug: string;

  //xác định mối quan hệ với brand
  @ManyToOne(() => Brands, (brand) => brand.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'brand_id',
  })
  brand: Brands;

  //category
  @ManyToOne(() => CateGory, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: CateGory;

  // product variant
  @OneToMany(
    () => ProductVariant,
    (product_variant) => product_variant.product,
    {
      onDelete: 'CASCADE',
    },
  )
  product_variant: ProductVariant[];
}
