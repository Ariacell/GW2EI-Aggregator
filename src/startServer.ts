import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const startServer = () => {
    dotenv.config();

    if (!process.env.PORT) {
        process.exit(1);
    }

    const PORT: number = parseInt(process.env.PORT as string, 10);

    const app = express();
    app.use(helmet());
    app.use(cors());

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};
