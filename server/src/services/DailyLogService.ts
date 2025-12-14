import { PrismaClient } from "@prisma/client";
import { TimelineService } from "./TimelineService";

const prisma = new PrismaClient();

export class DailyLogService {
    private timelineService: TimelineService;

    constructor() {
        this.timelineService = new TimelineService();
    }

    async createLog(userId: string, content: string) {
        // 1. Create the log entry
        const log = await prisma.dailyLog.create({
            data: {
                userId,
                content,
                mood: "Neutral", // Default for now
            },
        });

        // 2. Add to timeline and reduce stress slightly
        await this.timelineService.createEvent({
            userId,
            type: "DAILY_LOG",
            title: "Private Journal Entry",
            description: "Recorded a personal thought.",
            stressChange: -1, // Small relief from journaling
        });

        return log;
    }

    async getUserLogs(userId: string) {
        return prisma.dailyLog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20 // Limit to latest 20
        });
    }
}
