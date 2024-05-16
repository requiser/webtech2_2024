import "reflect-metadata"
import { DataSource } from "typeorm"
import { Donor } from "./entity/Donor"
import { Donation } from "./entity/Donation"
import {Location} from "./entity/Location";
import {User} from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "",
    password: "",
    database: "veradas",
    synchronize: true,
    logging: true,
    entities: [Donation, Donor, Location, User],
    migrations: [],
    subscribers: [],
})
