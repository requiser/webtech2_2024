import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Donor } from "../entity/Donor";

export class DonorController extends Controller {
    repository = AppDataSource.getRepository(Donor);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as Donor);
            //delete entity.id;

            const insertedEntity = await this.repository.save(entity);
            //insertedEntity.donorId = insertedEntity.id.toString().padStart(6, '0');

            await this.repository.save(insertedEntity);

            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}
