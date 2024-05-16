import { Controller } from "./base.controller";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../entity/User'; // Import your Mongoose model for User

export class UserController extends Controller {
    model = UserModel; // Use your Mongoose model instead of repository

    create = async (req, res) => {
        try {
            const entity = await this.model.create(req.body);

            entity.password = await bcrypt.hash(entity.password, 12);

            const insertedEntity = await entity.save();

            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.model.findOne({ email: req.body.email }).select('+password');

            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }

            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }

            const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token });

        } catch (err) {
            this.handleError(res, err);
        }
    };
}
