import express from 'express';
import { DonorController } from './controller/donor.controller';
import { DonationController } from './controller/donation.controller';
import {LocationController} from "./controller/location.controller";
import {UserController} from "./controller/user.controller";
import { checkUser } from './protect-routes';

export function getRouter() {
    const router = express.Router();

    const donorController = new DonorController();

    router.get('/donor', donorController.getAll);
    router.get('/donor/:id', donorController.getOne);
    router.post('/donor', checkUser, donorController.create);
    router.put('/donor', checkUser, donorController.update);
    router.delete('/donor/:id', checkUser, donorController.delete);

    const locationController = new LocationController();

    router.get('/location', locationController.getAll);
    router.get('/location/:id', locationController.getOne);
    router.post('/location', checkUser, locationController.create);
    router.put('/location', checkUser, locationController.update);
    router.delete('/location/:id', checkUser, locationController.delete);

    const donationController = new DonationController();

    router.get('/donation', donationController.getAll);
    router.post('/donation', checkUser, donationController.create);
    router.get('/donation/:id', donationController.getOne);
    router.put('/donation', checkUser, donationController.update);
    router.get('/donation/of/donor/:donorId', donationController.getDonationsOfDonor);
    router.get('/donation/of/location/:locationId', donationController.getDonationsOfLocation);
    router.delete('/donation/:id', checkUser, donationController.delete);

    const userController = new UserController();

    router.post('/user/login', userController.login);
    router.post('/user/register', userController.create);
    router.get('/user/:id', donationController.getOne);

    return router;
}
