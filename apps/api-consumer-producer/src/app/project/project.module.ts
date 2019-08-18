import { Module } from "@nestjs/common"
import { ProjectController } from "./project.controller"
import { ProjectService } from "./project.service"
import { CategoryEntity, ProjectEntity } from "@parachain-tracker/models"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, CategoryEntity])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
