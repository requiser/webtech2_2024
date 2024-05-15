import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Donation } from "./Donation";
import {LocationDTO} from "../../../models";

@Entity()
export class Location implements LocationDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    active: boolean;

    @OneToMany(type => Donation, donation => donation.location)
    donation: Donation[];
}
