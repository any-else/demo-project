import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'payment',
})
export class Payment {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;
}
