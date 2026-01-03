import prisma from '../config/prisma';

export class BudgetService {
    static async calculateTripBudget(tripId: string) {
        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: {
                stops: {
                    include: {
                        activities: true,
                    },
                },
                expenses: true,
            },
        });

        if (!trip) throw new Error('Trip not found');

        let totalEstimatedCost = 0;
        let actualSpent = 0;

        // 1. Accommodation Estimates (Placeholder logic: $100 per night per stop)
        trip.stops.forEach((stop: any) => {
            const nights = Math.ceil((stop.departureDate.getTime() - stop.arrivalDate.getTime()) / (1000 * 60 * 60 * 24));
            totalEstimatedCost += nights * 100; // Base accommodation cost
        });

        // 2. Activity Costs
        trip.stops.forEach((stop: any) => {
            stop.activities.forEach((activity: any) => {
                totalEstimatedCost += activity.cost;
            });
        });

        // 3. Actual Expenses
        trip.expenses.forEach((expense: any) => {
            actualSpent += expense.amount;
        });

        return {
            estimated: totalEstimatedCost,
            actual: actualSpent,
            remaining: (trip.budget || 0) - actualSpent,
            isOverBudget: trip.budget ? actualSpent > trip.budget : false,
        };
    }
}
