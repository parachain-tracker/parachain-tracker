import { Injectable } from "@nestjs/common"
import { ProjectEntity } from "@parachain-tracker/models"
import { DeepPartial, DeleteResult, FindManyOptions, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private repository: Repository<ProjectEntity>) {}

    public list(): Promise<ProjectEntity[]> {
        return this.repository.find({ relations: ["category", "externalLinks"] })
    }

    public get(id: number): Promise<ProjectEntity> {
        return this.repository.findOne(id, { relations: ["category", "externalLinks"] })
    }

    public find(query: FindManyOptions<ProjectEntity>): Promise<ProjectEntity[]> {
        return this.repository.find(query)
    }

    public save(model: DeepPartial<ProjectEntity>): Promise<ProjectEntity> {
        return this.repository.save(model)
    }

    public delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}
