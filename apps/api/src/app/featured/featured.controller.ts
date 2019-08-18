import { Controller, Get, Query } from "@nestjs/common"
import { FeaturedService } from "./featured.service"
import { ProjectDto } from "@parachain-tracker/api-interfaces"

@Controller("featured")
export class FeaturedController {
    constructor(private featured: FeaturedService) {}
    @Get()
    public list(@Query("limit") limit: number): Promise<ProjectDto[]> {
        return this.featured.list({ limit })
    }
}
