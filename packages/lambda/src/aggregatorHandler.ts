import { Handler } from 'aws-lambda';
import { createLogger, format, transports } from 'winston';
import { aggregateJSONLogs } from './logAggregator/logAggregator';

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

    logger.info('Processing aggregation event: \n' + JSON.stringify(event, null, 2));
    return aggregateJSONLogs(event);
};
