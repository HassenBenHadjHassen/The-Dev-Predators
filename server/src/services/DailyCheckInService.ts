import { DailyCheckIn } from "@prisma/client";
import { BaseService } from "./BaseService";
import { DailyCheckInRepository } from "../repositories/DailyCheckInRepository";
import { ServiceResponse } from "../types";

export class DailyCheckInService extends BaseService<DailyCheckIn> {
    protected modelName = "DailyCheckIn";
    private dailyCheckInRepository: DailyCheckInRepository;

    constructor() {
        super();
        this.dailyCheckInRepository = new DailyCheckInRepository();
    }

    async create(data: any): Promise<ServiceResponse<DailyCheckIn>> {
        const dailyCheckIn = await this.dailyCheckInRepository.create(data);
        return this.createSuccessResponse(dailyCheckIn, "Check-in created successfully");
    }

    async findById(id: string): Promise<ServiceResponse<DailyCheckIn>> {
        const dailyCheckIn = await this.dailyCheckInRepository.findById(id);
        if (!dailyCheckIn) {
            return this.createErrorResponse("Check-in not found");
        }
        return this.createSuccessResponse(dailyCheckIn);
    }

    async findAll(filters: Record<string, any> = {}): Promise<ServiceResponse<DailyCheckIn[]>> {
        const dailyCheckIns = await this.dailyCheckInRepository.findAll(filters);
        return this.createSuccessResponse(dailyCheckIns);
    }

    async update(
        id: string,
        data: Partial<DailyCheckIn>
    ): Promise<ServiceResponse<DailyCheckIn>> {
        const dailyCheckIn = await this.dailyCheckInRepository.update(id, data);
        if (!dailyCheckIn) {
            return this.createErrorResponse("Check-in not found");
        }
        return this.createSuccessResponse(dailyCheckIn);
    }

    async delete(id: string): Promise<ServiceResponse<boolean>> {
        await this.dailyCheckInRepository.delete(id);
        return this.createSuccessResponse(true, "Check-in deleted successfully");
    }
}
