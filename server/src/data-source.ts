import "reflect-metadata"
import { DataSource } from "typeorm"
import { Donor } from "./entity/Donor"
import { Donation } from "./entity/Donation"
import {Location} from "./entity/Location";
import {User} from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27027,
    database: "veradas",
    synchronize: true,
    logging: true,
    entities: [Donation, Donor, Location, User],
    migrations: [],
    subscribers: []
})
