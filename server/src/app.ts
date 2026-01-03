import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import tripRoutes from './routes/trip.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/api/v1', (req, res) => {
    res.json({
        message: 'Welcome to GlobeTrotter API v1',
        endpoints: {
            auth: '/api/v1/auth',
            trips: '/api/v1/trips',
            admin: '/api/v1/admin',
            health: '/health'
        }
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/admin', adminRoutes);

app.use(errorHandler);

// API Routes will be added here

export default app;
