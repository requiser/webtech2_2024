import mongoose, { Schema, Document } from 'mongoose';
import { DonorDTO } from '../../../models'
import {Donation} from "./Donation";
import {OneToMany} from "typeorm";

export class Donor extends Document implements DonorDTO {
    name: string;
    gender: string;
    nationality: string;
    birthplace: string;
    birthdate: string;
    address: string;
    phone: string;
    idCard: number;
    @OneToMany(type => Donation, donation => donation.donor)
    donation?: Donation[];
}
export const DonorSchema: Schema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    birthplace: { type: String, required: true },
    birthdate: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    idCard: { type: Number, required: true },
    donation: {}
}, {versionKey: false});

export const DonorModel = mongoose.model<Donor>('Donor', DonorSchema);
