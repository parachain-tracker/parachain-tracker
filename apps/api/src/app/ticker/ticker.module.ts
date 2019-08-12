import { Module } from "@nestjs/common"
import { TickerService } from "./ticker.service"
import { TickerController } from "./ticker.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TickerEntity } from "../database/entity/ticker.entity"

@Module({
    imports: [TypeOrmModule.forFeature([TickerEntity])],
    providers: [TickerService],
    controllers: [TickerController],
})
export class TickerModule {}
