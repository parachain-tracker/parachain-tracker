import { Module } from "@nestjs/common"
import { ProjectController } from "./project.controller"
import { ProjectService } from "./project.service"
import { ProjectEntity } from "../../../../api/src/app/database/entity/project.entity"
import { CategoryEntity } from "../../../../api/src/app/database/entity/category.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, CategoryEntity])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {}
