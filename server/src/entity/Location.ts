import mongoose, { Schema, Document } from 'mongoose';
import { Donation } from './Donation';
import { LocationDTO } from '../../../models'
import {OneToMany} from "typeorm";

export class Location extends Document implements LocationDTO {
    name: string;
    address: string;
    active: boolean;
    @OneToMany(type => Donation, donation => donation.donor)
    donation?: Donation[];
}

export const LocationSchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    active: { type: Boolean, required: true },
    donation: {}
}, {versionKey: false});

export const LocationModel = mongoose.model<Location>('Location', LocationSchema);
