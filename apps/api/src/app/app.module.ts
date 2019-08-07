import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DappsModule } from "./dapps/dapps.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm"
import { DappEntity } from "./database/entity/dapp.entity"
import { CategoryEntity } from "./database/entity/category.entity"
import { ExternalLinkEntity } from "./database/entity/external-link.entity"

const ormconfig = require("../../../../ormconfig.json")

const connectionOptions: ConnectionOptions = {
    ...ormconfig,
    entities: [DappEntity, CategoryEntity, ExternalLinkEntity],
}

@Module({
    imports: [TypeOrmModule.forRoot(connectionOptions), DappsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
