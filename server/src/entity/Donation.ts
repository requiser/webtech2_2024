import mongoose, { Schema, Document } from 'mongoose';
import { Donor } from './Donor';
import { Location } from './Location';
import {DonationDTO, DonorDTO, LocationDTO} from '../../../models'
import {ManyToOne} from "typeorm";

export class Donation extends Document implements DonationDTO {
    donationDate: string;
    @ManyToOne(type => Donor, donor => donor.donation, { eager: true })
    donor: Donor;
    @ManyToOne(type => Donor, donor => donor.donation, { eager: true })
    location: Location;
    can_donate: boolean;
    reason: string;
    doctor: string;
    directed: boolean;
    recipient_name: string;
    recipient_idCard: number;
}
export const DonationSchema: Schema = new Schema({
    donationDate: { type: Date, default: Date.now },
    donor: { type: String, ref: 'Donor' }, // Assuming Donor model
    location: { type: String, ref: 'Location' }, // Assuming Location model
    can_donate: { type: Boolean, required: true },
    reason: { type: String },
    doctor: { type: String, required: true },
    directed: { type: Boolean, required: true },
    recipient_name: { type: String },
    recipient_idCard: { type: Number }
}, {versionKey: false});

export const DonationModel = mongoose.model<Donation>('Donation', DonationSchema);

