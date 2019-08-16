import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProjectModule } from "./project/project.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm"
import { ProjectEntity } from "./database/entity/project.entity"
import { CategoryEntity } from "./database/entity/category.entity"
import { ExternalLinkEntity } from "./database/entity/external-link.entity"
import { TickerEntity } from "./database/entity/ticker.entity"
import { TickerModule } from "./ticker/ticker.module"
import { ScheduleModule } from "nest-schedule"
import { DynamicCronModule } from "./schedule/dynamic_cron.module"
import { JobsModule } from "./jobs/jobs.module"
import { environment } from "../environments/environment"

const path = require('path')
const ormconfig = require("../../../../ormconfig.json")

// Run migrations from CLI, this line prevents compile error because TypeORM
// expects javascript but the source is typescript
delete ormconfig.migrations

const connectionOptions: ConnectionOptions = {
    ...ormconfig,
    entities: [ProjectEntity, CategoryEntity, ExternalLinkEntity, TickerEntity],
}

if (!environment.production) { 
    require('dotenv').config({path: path.resolve(__dirname, '../../../apps/api/.env')})
}

@Module({
    imports: [
        TypeOrmModule.forRoot(connectionOptions),
        ProjectModule,
        TickerModule,
        JobsModule,
        ScheduleModule.register(),
        DynamicCronModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
