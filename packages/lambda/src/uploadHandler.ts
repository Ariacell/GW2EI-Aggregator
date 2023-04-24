import { Handler } from 'aws-lambda';
import { createLogger, format, transports } from 'winston';
import { aggregateJSONLogs } from './logAggregator/logAggregator';
import { randomUUID } from 'crypto';
import { S3 } from 'aws-sdk';

const getUploadURL = async function (event: any) {
    const randomID = randomUUID();
    const Key = `${randomID}.zip`;

    if (!process.env.UPLOAD_BUCKET_ID) throw new Error('UPLOAD_BUCKET_ID not set');

    // Get signed URL from S3
    const s3Params = {
        Bucket: process.env.UPLOAD_BUCKET_ID,
        Key,
        Expires: process.env.UPLOAD_URL_EXPIRATION_IN_SECONDS || 300,
        ContentType: 'application/zip',
    };

    const s3 = new S3({ region: 'ap-southeast-2' });
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
    return JSON.stringify({
        uploadURL: uploadURL,
        Key,
    });
};

export const handler: Handler = async (event, context) => {
    const logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json(),
        ),
        defaultMeta: { service: 'gw2-aggregator-lambda' },
        transports: [new transports.Console()],
    });

    logger.info('Processing upload event: \n' + JSON.stringify(event, null, 2));
    return await getUploadURL(event);
};
