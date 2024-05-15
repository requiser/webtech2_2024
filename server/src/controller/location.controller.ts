import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Location } from "../entity/Location";

export class LocationController extends Controller {
    repository = AppDataSource.getRepository(Location);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as Location);
            //delete entity.id;

            const insertedEntity = await this.repository.save(entity);
            //insertedEntity.locationId = insertedEntity.id.toString().padStart(6, '0');

            await this.repository.save(insertedEntity);

            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}
