import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/prisma';
import { z } from 'zod';

const tripSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
    budget: z.number().optional(),
    currency: z.string().default('USD'),
});

export const createTrip = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, startDate, endDate, budget, currency } = tripSchema.parse(req.body);
        const userId = req.userId!;

        const trip = await prisma.trip.create({
            data: {
                title,
                description,
                startDate,
                endDate,
                budget,
                currency,
                ownerId: userId,
            },
        });

        res.status(201).json(trip);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getTrips = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;
        const trips = await prisma.trip.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    { sharedWith: { some: { userId } } }
                ]
            },
            include: {
                stops: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(trips);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.userId!;

        const trip = await prisma.trip.findFirst({
            where: {
                id,
                OR: [
                    { ownerId: userId },
                    { sharedWith: { some: { userId } } }
                ]
            },
            include: {
                stops: {
                    include: {
                        activities: true,
                    },
                    orderBy: { order: 'asc' },
                },
                expenses: true,
                sharedWith: {
                    include: {
                        user: {
                            select: { id: true, email: true, name: true, avatar: true }
                        }
                    }
                }
            },
        });

        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        res.json(trip);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const stopSchema = z.object({
    city: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    arrivalDate: z.string().transform((str) => new Date(str)),
    departureDate: z.string().transform((str) => new Date(str)),
    order: z.number(),
});

export const addStop = async (req: AuthRequest, res: Response) => {
    try {
        const { id: tripId } = req.params;
        const data = stopSchema.parse(req.body);

        const stop = await prisma.tripStop.create({
            data: {
                ...data,
                tripId,
            },
        });

        res.status(201).json(stop);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

const activitySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    startTime: z.string().transform((str) => new Date(str)).optional(),
    endTime: z.string().transform((str) => new Date(str)).optional(),
    cost: z.number().default(0),
    category: z.string().optional(),
});

export const addActivity = async (req: AuthRequest, res: Response) => {
    try {
        const { stopId } = req.params;
        const data = activitySchema.parse(req.body);

        const activity = await prisma.activity.create({
            data: {
                ...data,
                stopId,
            },
        });

        res.status(201).json(activity);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
