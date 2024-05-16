import express from 'express';
import mongoose from './data-source'; // Assuming your Mongoose configuration file is named mongooseConfig.ts
import { getRouter } from "./routes";
import { handleAuthorizationError } from "./protect-routes";

async function main() {
    try {
        // Connect to MongoDB
        await mongoose;

        const app = express();

        app.use(express.json());

        app.use('/api', getRouter(), handleAuthorizationError);

        app.listen(3000, () => {
            console.log('Listening on port :3000 ...');
        });
    } catch(err) {
        console.error('Cannot start server', err);
    }
}

main();
