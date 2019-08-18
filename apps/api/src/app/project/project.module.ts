import { Module } from "@nestjs/common"
import { ProjectController } from "./project.controller"
import { ProjectService } from "./project.service"
import { ProjectEntity } from "../database/entity/project.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
