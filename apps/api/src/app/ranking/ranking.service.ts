import { Injectable } from "@nestjs/common"
import { ProjectType, RankingSearchDto } from "@parachain-tracker/api-interfaces"
import { InjectRepository } from "@nestjs/typeorm"
import { ProjectEntity } from "../database/entity/project.entity"
import { Repository, SelectQueryBuilder } from "typeorm"

@Injectable()
export class RankingService {
    private query: SelectQueryBuilder<ProjectEntity>

    constructor(@InjectRepository(ProjectEntity) private project: Repository<ProjectEntity>) {
        this.query = this.project.createQueryBuilder("project")
    }

    public topProjects(query: RankingSearchDto) {
        const type =
            typeof ProjectType[query.type] === "string" ? query.type : ProjectType[query.type]
        return this.query
            .where("project.type = :type", { type })
            .addOrderBy("project.stars", "DESC")
            .addOrderBy("project.commits", "DESC")
            .limit(parseInt(query.limit, 10))
            .getMany()
    }
}
