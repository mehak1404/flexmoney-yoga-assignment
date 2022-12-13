import HTTPStatus from 'http-status';
import chalk from 'chalk';

// Routes
import userRoutes from './api/user/user.routes.js';
import authRoutes from './api/auth/auth.routes.js';
import batchRoutes from './api/batch/batch.routes.js';
import paymentRoutes from './api/payment/payment.routes.js';



export default function link (app){
    // logger
    app.use((req, res, next) => {
        console.log(
            `${chalk.blue(new Date().toISOString())} [${chalk.red(req.method)}] ${chalk.green(
                req.url
            )}`
        );
        next();
    });

    // Insert routes below
    app.use('/api', userRoutes);
    app.use('/api', authRoutes);
    app.use('/api', batchRoutes);
    app.use('/api', paymentRoutes);


    // Handler for invalid routes
    app.all(
        '*',
        async (req, res, next) => {
            throw error(
                {
                    message: 'Invalid route.',
                },
                HTTPStatus.NOT_FOUND,
                HTTPStatus['404']
            );
        }
    );
};
