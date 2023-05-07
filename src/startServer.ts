import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

export const startServer = () => {
    dotenv.config();

    if (!process.env.PORT) {
        process.env.PORT = '5000';
    }

    const PORT: number = parseInt(process.env.PORT as string, 10);

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
    return app;
};
