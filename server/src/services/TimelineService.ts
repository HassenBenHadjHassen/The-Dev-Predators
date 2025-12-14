import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TimelineService {
    async createEvent(data: {
        userId: string;
        type: string;
        title: string;
        description: string;
        stressChange: number;
    }) {
        // 1. Create the event
        const event = await prisma.timelineEvent.create({
            data: {
                userId: data.userId,
                type: data.type,
                title: data.title,
                description: data.description,
                stressChange: data.stressChange,
            },
        });

        // 2. Update user stress level
        const user = await prisma.user.findUnique({
            where: { id: data.userId },
            select: { stressLevel: true },
        });

        if (user) {
            let newStress = (user.stressLevel || 50) + data.stressChange;
            // Clamp between 0 and 100
            newStress = Math.max(0, Math.min(100, newStress));

            await prisma.user.update({
                where: { id: data.userId },
                data: { stressLevel: newStress },
            });
        }

        return event;
    }

    async getUserTimeline(userId: string) {
        return await prisma.timelineEvent.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 20, // Limit to last 20 events
        });
    }

    async getUserStressLevel(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { stressLevel: true },
        });
        return user?.stressLevel ?? 50;
    }
}
