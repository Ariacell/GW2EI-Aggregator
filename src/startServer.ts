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
    // app.use(
    //     helmet({
    //         contentSecurityPolicy: {
    //             directives: {
    //                 'connect-src': ["'self'", `http://localhost:${PORT}`],
    //                 'default-src': "'self'",
    //                 'script-src': ["'self'", `http://localhost:${PORT}`, 'https://cdn.datatables.net'],
    //             },
    //         },
    //     }),
    // );
    app.use(cors());
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
    return app;
};
