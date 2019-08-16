import { Controller, Get, Query } from "@nestjs/common"
import { ProjectDto, RankingSearchDto } from "@parachain-tracker/api-interfaces"
import { ProjectService } from "../project/project.service"
import { RankingService } from "./ranking.service"

@Controller("ranking")
export class RankingController {
    constructor(private ranking: RankingService) {}

    @Get()
    public search(@Query() query: RankingSearchDto): Promise<ProjectDto[]> {
        return this.ranking.topProjects(query)
    }
}
