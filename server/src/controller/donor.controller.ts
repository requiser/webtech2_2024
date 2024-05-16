import mongoose from 'mongoose';
import { Controller } from "./base.controller";
import { DonorModel } from '../entity/Donor'; // Import your Mongoose model for Donor

export class DonorController extends Controller {
    model = DonorModel; // Use your Mongoose model instead of repository

    create = async (req, res) => {
        try {
            const entity = await this.model.create(req.body);

            const insertedEntity = await entity.save();

            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}
