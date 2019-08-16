import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    ValidationPipe,
} from "@nestjs/common"
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

    @Post()
    public create(model): Promise<ProjectDto> {
        return this.project.save(model)
    }

    @Patch(":id")
    public modify(
        @Param("id", ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) model: ProjectDto,
    ): Promise<ProjectDto> {
        return this.project.save({
            ...model,
            id,
        })
    }

    @Put(":id")
    public replace(
        @Param("id", ParseIntPipe) id: number,
        @Body() model: ProjectDto,
    ): Promise<ProjectDto> {
        return this.project.save({
            ...model,
            id,
        })
    }

    @Delete(":id")
    public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
        await this.project.delete(id)
    }
}
