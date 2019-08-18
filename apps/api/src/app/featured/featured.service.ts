import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { ProjectEntity } from "../database/entity/project.entity"
import { Repository } from "typeorm"

@Injectable()
export class FeaturedService {
    constructor(@InjectRepository(ProjectEntity) private repository: Repository<ProjectEntity>) {}
    public list(query: { limit: number }) {
        return this.repository.find({
            where: {
                featured: true,
            },
            take: query.limit >= 0 ? query.limit : undefined,
            relations: ["category"],
        })
    }
}
