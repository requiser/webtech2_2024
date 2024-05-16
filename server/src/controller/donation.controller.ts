import { Controller } from "./base.controller";
import { DonationModel } from "../entity/Donation";

export class DonationController extends Controller {
    model = DonationModel;

    getDonationsOfDonor = async (req, res) => {
        try {
            const donorId = req.params.donorId.toString();
            const donations = await this.model
                .find({ donor: donorId })
                .populate('donor')
                .populate('location');
            res.json(donations);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getDonationsOfLocation = async (req, res) => {
    try {
        const locationId = req.params.locationId;
        const donations = await this.model
            .find({ location: locationId })
            .populate('donor')
            .populate('location');
        res.json(donations);
    } catch (err) {
        this.handleError(res, err);
    }
};
}
