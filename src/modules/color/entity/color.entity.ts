import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../../products/entity/product_variant.entity';

@Entity({
  name: 'colors',
})
export class Color {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    length: 255,
    nullable: false,
  })
  color_name: string;

  @Column({
    length: 255,
    nullable: true,
  })
  image_color: string;

  @OneToMany(() => ProductVariant, (prod_variant) => prod_variant.color, {
    onDelete: 'CASCADE',
  })
  prod_variant: ProductVariant[];
}
