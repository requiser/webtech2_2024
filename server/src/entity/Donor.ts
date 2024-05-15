import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Donation } from "./Donation";
import { DonorDTO } from "../../../models";

@Entity()
export class Donor implements DonorDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    idCard: number;

    @OneToMany(type => Donation, donation => donation.donor)
    donation: Donation[];
}
