import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  hashedPassword!: string;
}
