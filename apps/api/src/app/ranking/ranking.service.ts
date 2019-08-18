import { Injectable } from "@nestjs/common"
import { ProjectType, RankingSearchDto } from "@parachain-tracker/api-interfaces"
import { InjectRepository } from "@nestjs/typeorm"
import { ProjectEntity } from "../database/entity/project.entity"
import { Repository, SelectQueryBuilder } from "typeorm"
import { CategoryEntity } from "../database/entity/category.entity"

@Injectable()
export class RankingService {
    constructor(@InjectRepository(ProjectEntity) private project: Repository<ProjectEntity>) {}

    public topProjects(search: RankingSearchDto) {
        const type =
            typeof ProjectType[search.type] === "string" ? search.type : ProjectType[search.type]

        let query = this.project
            .createQueryBuilder("project")
            .where("project.type = :type", { type })
            .addOrderBy("project.stars", "DESC")
            .addOrderBy("project.commits", "DESC")
            .leftJoinAndSelect("project.category", "category")

        if (search.limit) {
            query = query.limit(parseInt(search.limit.toString(), 10))
        }

        return query.getMany()
    }
}
