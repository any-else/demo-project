import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CateGory } from '../../category/entity/category.entity';

@Entity({
  name: 'collections',
})
export class Collection {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;

  @Column({
    length: 255,
    unique: true,
  })
  collection_name: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @Column({
    length: 255,
    nullable: true,
  })
  image_collection: string;

  //xác định mối quan hệ Category

  @ManyToOne(() => CateGory, (cateGory) => cateGory.collections, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  //joinColumn để tạo cột
  @JoinColumn({
    name: 'category_id',
  })
  category: CateGory;
}
