import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalTrips = await prisma.trip.count();
        const totalStops = await prisma.tripStop.count();

        const popularCities = await prisma.tripStop.groupBy({
            by: ['city'],
            _count: {
                city: true,
            },
            orderBy: {
                _count: {
                    city: 'desc',
                },
            },
            take: 5,
        });

        const tripTrends = await prisma.trip.groupBy({
            by: ['createdAt'],
            _count: {
                id: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        res.json({
            totalUsers,
            totalTrips,
            totalStops,
            popularCities,
            tripTrends,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
