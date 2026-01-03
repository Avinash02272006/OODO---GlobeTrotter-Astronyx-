import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getGlobalActivities = async (req: Request, res: Response) => {
    try {
        const { category, search } = req.query;

        const activities = await prisma.globalActivity.findMany({
            where: {
                AND: [
                    category ? { category: String(category) } : {},
                    search ? {
                        OR: [
                            { title: { contains: String(search) } },
                            { description: { contains: String(search) } },
                            { location: { contains: String(search) } }
                        ]
                    } : {}
                ]
            }
        });

        res.json(activities);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const seedActivities = async (req: Request, res: Response) => {
    try {
        const activities = [
            {
                title: "Sunrise Paragliding",
                description: "Experience the breathtaking views of the Swiss Alps from above.",
                image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833",
                price: 180,
                rating: 4.9,
                reviews: 1240,
                category: "Adventure",
                location: "Interlaken, Switzerland"
            },
            {
                title: "Eiffel Tower Private Tour",
                description: "Skip the line and enjoy a private tour of the world's most famous landmark.",
                image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
                price: 95,
                rating: 4.8,
                reviews: 3500,
                category: "Sightseeing",
                location: "Paris, France"
            },
            {
                title: "Traditional Sushi Workshop",
                description: "Learn the art of sushi making from a master chef in the heart of Tokyo.",
                image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
                price: 120,
                rating: 4.9,
                reviews: 850,
                category: "Food",
                location: "Tokyo, Japan"
            }
        ];

        for (const activity of activities) {
            const exists = await prisma.globalActivity.findFirst({
                where: { title: activity.title }
            });
            if (!exists) {
                await prisma.globalActivity.create({
                    data: activity
                });
            }
        }

        res.json({ message: "Activities seeded successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
