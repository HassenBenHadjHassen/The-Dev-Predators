import { DailyCheckIn } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class DailyCheckInRepository extends BaseRepository<DailyCheckIn> {
    constructor() {
        super();
    }

    async create(data: any): Promise<DailyCheckIn> {
        return this.handleDatabaseOperation(() =>
            this.prisma.dailyCheckIn.create({
                data,
            })
        );
    }

    async findById(id: string): Promise<DailyCheckIn | null> {
        return this.handleDatabaseOperation(() =>
            this.prisma.dailyCheckIn.findUnique({
                where: { id },
            })
        );
    }

    async findAll(filters: Record<string, any> = {}): Promise<DailyCheckIn[]> {
        const where = this.buildWhereClause(filters);
        const orderBy = this.buildOrderByClause(
            filters.sortBy,
            filters.sortOrder as "asc" | "desc"
        );
        const { skip, take } = this.buildPaginationOptions(
            filters.page,
            filters.limit
        );

        return this.handleDatabaseOperation(() =>
            this.prisma.dailyCheckIn.findMany({
                where,
                orderBy,
                skip,
                take,
            })
        );
    }

    async update(id: string, data: Partial<DailyCheckIn>): Promise<DailyCheckIn | null> {
        return this.handleDatabaseOperation(() =>
            this.prisma.dailyCheckIn.update({
                where: { id },
                data,
            })
        );
    }

    async delete(id: string): Promise<boolean> {
        await this.handleDatabaseOperation(() =>
            this.prisma.dailyCheckIn.delete({
                where: { id },
            })
        );
        return true;
    }
}
