import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'payment_status',
})
export class Payment_Status {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  _id: number;
}
