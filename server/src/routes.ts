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
    router.post('/donor', donorController.create, checkUser);
    router.put('/donor', donorController.update, checkUser);
    router.delete('/donor/:id', donorController.delete, checkUser);

    const locationController = new LocationController();

    router.get('/location', locationController.getAll);
    router.get('/location/:id', locationController.getOne);
    router.post('/location', locationController.create, checkUser);
    router.put('/location', locationController.update, checkUser);
    router.delete('/location/:id', locationController.delete, checkUser);

    const donationController = new DonationController();

    router.get('/donation', donationController.getAll);
    router.post('/donation', donationController.create, checkUser);
    router.get('/donation/:id', donationController.getOne);
    router.put('/donation', donationController.update, checkUser);
    router.get('/donation/of/donor/:donorId', donationController.getDonationsOfDonor);
    router.get('/donation/of/location/:locationId', donationController.getDonationsOfLocation);
    router.delete('/donation/:id', donationController.delete, checkUser);

    const userController = new UserController();

    router.post('/user/login', userController.login);
    router.post('/user/register', userController.create);
    router.get('/user/:id', donationController.getOne);

    return router;
}
