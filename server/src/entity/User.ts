import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {UserDTO} from "../../../models";

@Entity()
export class User implements UserDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  nationality: string;

  @Column()
  birthplace: string;

  @Column()
  birthdate: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  idCard: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

}
