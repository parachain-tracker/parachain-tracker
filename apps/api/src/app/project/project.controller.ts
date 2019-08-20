import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common"
import { ProjectService } from "./project.service"
import { ProjectDto } from "@parachain-tracker/api-interfaces"

@Controller("project")
export class ProjectController {
    constructor(private project: ProjectService) {}

    @Get()
    public list(): Promise<ProjectDto[]> {
        return this.project.list()
    }

    @Get(":id")
    public get(@Param("id", ParseIntPipe) id: number): Promise<ProjectDto> {
        return this.project.get(id)
    }
}
