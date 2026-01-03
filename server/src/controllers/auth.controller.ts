import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.utils';
import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    additionalInfo: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, phoneNumber, city, country, additionalInfo } = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phoneNumber,
                city,
                country,
                additionalInfo,
            },
        });

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                city: user.city,
                country: user.country,
                additionalInfo: user.additionalInfo,
                avatar: user.avatar,
                role: user.role,
            },
            accessToken,
            refreshToken
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                city: user.city,
                country: user.country,
                additionalInfo: user.additionalInfo,
                avatar: user.avatar,
                role: user.role,
            },
            accessToken,
            refreshToken
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

    try {
        const { userId } = verifyRefreshToken(refreshToken);

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(403).json({ message: 'User no longer exists' });
        }

        const accessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);

        res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

const updateProfileSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phoneNumber: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    additionalInfo: z.string().optional(),
    avatar: z.string().optional(),
});

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const data = updateProfileSchema.parse(req.body);

        const user = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                city: true,
                country: true,
                additionalInfo: true,
                avatar: true,
                role: true,
            }
        });

        res.json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
