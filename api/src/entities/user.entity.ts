import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nickname: string;

  @Column({type: 'varchar'})
  password: string // hashed version, simple auth for now
}
