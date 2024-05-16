import { Repository } from "typeorm";

export abstract class Controller {
    repository: Repository<any>;

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({ id });
            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body) as any;
            delete entity.id;

            const insertedEntity = await this.repository.save(entity);
            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    update = async (req, res) => {
        try {
            const id = req.body.id;

            let entity = await this.repository.findOneBy({ id });
            if (!entity) {
                return this.handleError(res, null, 404, "No entity found with the given id.");
            }

            entity = this.repository.create(req.body as object);

            const insertedEntity = await this.repository.save(entity);
            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    delete = async (req, res) => {
        try {
            const id = req.params.id;

            let entity = await this.repository.findOneBy({ id });
            if (!entity) {
                return this.handleError(res, null, 404, "No entity found with the given id.");
            }

            await this.repository.remove(entity);
            res.send();
        } catch (err) {
            this.handleError(res, err);
        }
    };

    handleError(res, err, status = 500, message = 'Unexpected server error.') {
        if (err) {
            console.error(err);
        }

        res.status(status);
        res.json({ error: message });
    }
}
