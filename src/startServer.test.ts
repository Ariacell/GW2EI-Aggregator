import { startServer } from './startServer';

const app = {
    use: jest.fn(),
    listen: jest.fn(),
};
jest.mock('express', () => {
    return {
        __esModule: true,
        default: () => {
            return app;
        },
    };
});

describe('app', () => {
    it('starts without crashing', () => {
        startServer();
        expect(app.listen).toHaveBeenCalled();
    });
});
