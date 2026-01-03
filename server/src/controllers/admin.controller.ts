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
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const where: any = {};

        if (search) {
            where.OR = [
                { email: { contains: String(search) } },
                { firstName: { contains: String(search) } },
                { lastName: { contains: String(search) } },
            ];
        }

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                _count: {
                    select: { trips: true }
                }
            }
        });
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPopularActivities = async (req: Request, res: Response) => {
    try {
        const popularActivities = await prisma.activity.groupBy({
            by: ['title'],
            _count: {
                title: true,
            },
            orderBy: {
                _count: {
                    title: 'desc',
                },
            },
            take: 10,
        });
        res.json(popularActivities);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
