import { Module } from "@nestjs/common"
import { ProjectService } from "./project.service"
import { CategoryEntity, ProjectEntity } from "@parachain-tracker/models"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, CategoryEntity])],
    controllers: [],
    providers: [ProjectService],
    exports: [ProjectService],
})
export class ProjectModule {}
