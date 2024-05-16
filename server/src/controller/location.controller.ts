import { Controller } from "./base.controller";
import { LocationModel } from '../entity/Location'; // Import your Mongoose model for Location

export class LocationController extends Controller {
    model = LocationModel; // Use your Mongoose model instead of repository

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
