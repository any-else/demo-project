import { Collection } from '../../collections/entity/collection.entity';
import { Product } from '../../products/entity/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'categories',
})
export class CateGory {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({
    length: 255,
    nullable: false,
  })
  category_name: string;

  @Column({
    default: true,
  })
  active: boolean;

  //xác định moois quan hệ với product

  @OneToMany(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

  //quan hệ như thế nào với collection

  @OneToMany(() => Collection, (collection) => collection.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  collections: Collection[];

  /**
   * ở đây ae sẽ thắc mắc tạo sao sinh ra category rồi sao còn tạo ra thêm collection
   *
   *  thì giải thích cho ae
   *      => Bởi vì Trong danh mục của mình nó là một phạm trù rất rộng, nên khi thiết kế mình cần các collection liên quan
   *  ví dụ cho ae
   *
   *    với trang web bán hàng
   *      => Category: Đồ điện tử
   *            Collection: Điện thoại di động, Laptop, v,v.v.
   *      Category: Thời trang
   *            Collection: Áo sơ mi, quần bò, mũ cối
   *  và dĩ nhiên 1 Category thì sẽ có nhiều Collection
   */
}
