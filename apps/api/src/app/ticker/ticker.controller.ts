import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common"
import { TickerService } from "./ticker.service"
import { Paginated, TickerDto } from "@parachain-tracker/api-interfaces"

@Controller("ticker")
export class TickerController {
    constructor(private ticker: TickerService) {}

    @Get()
    public async list(
        @Query("project_id", ParseIntPipe) projectId: number,
    ): Promise<Paginated<TickerDto>> {
        const items = await this.ticker.findByProjectId(projectId)

        return {
            items,
            itemsPerPage: items.length,
            from: 0,
            to: items.length - 1,
            totalItems: items.length,
        }
    }
}
