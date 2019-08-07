import { Module } from "@nestjs/common"
import { DappsController } from "./dapps.controller"
import { DappsService } from "./dapps.service"
import { DappEntity } from "../database/entity/dapp.entity"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([DappEntity])],
    controllers: [DappsController],
    providers: [DappsService],
})
export class DappsModule {}
