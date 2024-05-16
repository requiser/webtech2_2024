import mongoose from 'mongoose';

export abstract class Controller {
    model: mongoose.Model<any>;

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.model.findById(id);
            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getAll = async (req, res) => {
        try {
            const entities = await this.model.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req, res) => {
        try {
            const entity = await this.model.create(req.body);
            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    update = async (req, res) => {
        try {
            const id = req.body._id;
            let entity = await this.model.findById(id);
            if (!entity) {
                return this.handleError(res, null, 404, "No entity found with the given _id.");
            }
            entity.set(req.body);

            const updatedEntity = await entity.save();
            res.json(updatedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    delete = async (req, res) => {
        try {
            const id = req.params.id;
            const deletedEntity = await this.model.findByIdAndDelete(id);
            if (!deletedEntity) {
                return this.handleError(res, null, 404, "No entity found with the given _id.");
            }

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
