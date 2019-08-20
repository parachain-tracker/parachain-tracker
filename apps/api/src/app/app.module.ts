import { Module } from "@nestjs/common"
import { ProjectModule } from "./project/project.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConnectionOptions } from "typeorm"
import {
    CategoryEntity,
    ExternalLinkEntity,
    ProjectEntity,
    TickerEntity,
} from "@parachain-tracker/models"
import { TickerModule } from "./ticker/ticker.module"
import { RankingModule } from "./ranking/ranking.module"
import { FeaturedModule } from "./featured/featured.module"

const ormconfig = require("../../../../ormconfig.json")

// Run migrations from CLI, this line prevents compile error because TypeORM
// expects javascript but the source is typescript
delete ormconfig.migrations

const connectionOptions: ConnectionOptions = {
    ...ormconfig,
    entities: [ProjectEntity, CategoryEntity, ExternalLinkEntity, TickerEntity],
}

@Module({
    imports: [
        TypeOrmModule.forRoot(connectionOptions),
        ProjectModule,
        TickerModule,
        RankingModule,
        FeaturedModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
