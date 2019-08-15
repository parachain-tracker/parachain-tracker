import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common"
import { ProjectService } from "./project.service"

@Controller()
export class ProjectController {
    constructor(private project: ProjectService) {}
}
