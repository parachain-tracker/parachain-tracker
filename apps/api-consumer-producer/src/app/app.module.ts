import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProjectModule } from "./project/project.module"

import { CategoryEntity, ExternalLinkEntity, ProjectEntity } from "@parachain-tracker/models"

const ormconfig = require("../../../../ormconfig.json")

delete ormconfig.migrations

const connectionOptions: ConnectionOptions = {
    ...ormconfig,
    entities: [ProjectEntity, CategoryEntity, ExternalLinkEntity],
}

@Module({
    imports: [TypeOrmModule.forRoot(connectionOptions), ProjectModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
