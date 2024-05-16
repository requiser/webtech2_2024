import mongoose, { Schema, Document } from 'mongoose';
import { UserDTO } from '../../../models'

export class User extends Document implements UserDTO {
    name: string;
    gender: string;
    nationality: string;
    birthplace: string;
    birthdate: string;
    address: string;
    phone: string;
    idCard: number;
    email: string;
    password: string;
}

export const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    birthplace: { type: String, required: true },
    birthdate: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    idCard: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }
}, {versionKey: false});

export const UserModel = mongoose.model<User>('User', UserSchema);
