import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Donation } from "../entity/Donation";
import { Donor } from "../entity/Donor";
import { Location } from "../entity/Location";

export class DonationController extends Controller {
    repository = AppDataSource.getRepository(Donation);
    donorRepository = AppDataSource.getRepository(Donor);
    locationRepository = AppDataSource.getRepository(Location);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as Donation);

            const donor = await this.donorRepository.findOne({
                where: { id: entity.donor.id }
            });
            if (!donor) {
                return this.handleError(res, null, 404, 'A donor nem létezik.');
            }

            const location = await this.locationRepository.findOne({
                where: { id: entity.location.id }
            });
            if (!location) {
                return this.handleError(res, null, 404, 'A helyszín nem létezik.');
            }

            const insertedEntity = await this.repository.save(entity);
            res.json(insertedEntity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getDonationsOfDonor = async (req, res) => {
        try {
            const donorId = req.params.donorId;

            // select donations where source.id = donorId or destination.id = donorId
            const donation = await this.repository.find({
                where: [
                    { donor: { id: donorId } }
                ]
            });

            res.json(donation);
        } catch (err) {
            this.handleError(res, err);
        }
    };
    getDonationsOfLocation = async (req, res) => {
        try {
            const locationId = req.params.locationId;

            // select donations where source.id = donorId or destination.id = donorId
            const donation = await this.repository.find({
                where: [
                    { location: { id: locationId } }
                ]
            });

            res.json(donation);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}
