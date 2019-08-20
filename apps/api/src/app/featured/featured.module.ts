import { Module } from "@nestjs/common"
import { FeaturedController } from "./featured.controller"
import { FeaturedService } from "./featured.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProjectEntity } from "@parachain-tracker/models"

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity])],
    controllers: [FeaturedController],
    providers: [FeaturedService],
})
export class FeaturedModule {}
