import { Module } from "@nestjs/common"
import { RankingController } from "./ranking.controller"
import { RankingService } from "./ranking.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProjectEntity } from "../database/entity/project.entity"

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [RankingController],
    providers: [RankingService],
})
export class RankingModule {}
