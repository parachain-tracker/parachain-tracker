import { Module } from "@nestjs/common"
import { DynamicCronController } from "./dynamic_cron.controller"
import { DynamicCronService } from "./dynamic_cron.service"

@Module({
    imports: [],
    providers: [DynamicCronService],
    controllers: [DynamicCronController],
})
export class DynamicCronModule {}
