import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProjectModule } from "./project/project.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm"
import { ProjectEntity } from "./database/entity/project.entity"
import { CategoryEntity } from "./database/entity/category.entity"
import { ExternalLinkEntity } from "./database/entity/external-link.entity"

const ormconfig = require("../../../../ormconfig.json")

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
