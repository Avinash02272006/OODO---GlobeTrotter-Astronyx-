import { Request, Response } from 'express';
import prisma from '../config/prisma';
const p = prisma as any;

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: String(search) } },
                { content: { contains: String(search) } },
            ];
        }

        const posts = await p.post.findMany({
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, image, location } = req.body;
        const authorId = (req as any).userId;

        const post = await p.post.create({
            data: {
                title,
                content,
                image,
                location,
                authorId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
            },
        });

        // Emit socket event for real-time update
        const io = req.app.get('io');
        io.emit('new-post', post);

        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await p.post.update({
            where: { id },
            data: {
                likes: {
                    increment: 1,
                },
            },
        });

        const io = req.app.get('io');
        io.emit('post-liked', { postId: id, likes: post.likes });

        res.json(post);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
