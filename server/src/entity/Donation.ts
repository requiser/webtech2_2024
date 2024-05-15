import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Donor } from "./Donor";
import { DonationDTO } from "../../../models";
import {Location} from "./Location";

@Entity()
export class Donation implements DonationDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    donationDate: string;

    @ManyToOne(type => Donor, donor => donor.donation, { eager: true })
    donor: Donor;

    @ManyToOne(type => Location, location => location.donation, { eager: true })
    location: Location;

    @Column()
    can_donate: boolean;

    @Column()
    reason: string;

    @Column()
    doctor: string;

    @Column()
    directed: boolean;

    @Column()
    recipient_name: string;

    @Column()
    recipient_idCard: number;
}
