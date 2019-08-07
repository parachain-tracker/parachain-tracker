import { Injectable } from "@nestjs/common"
import { DappEntity } from "../database/entity/dapp.entity"
import { DeepPartial, DeleteResult, FindManyOptions, Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class DappsService {
    constructor(@InjectRepository(DappEntity) private repository: Repository<DappEntity>) {}

    public list(): Promise<DappEntity[]> {
        return this.repository.find({ relations: ["category", "externalLinks"] })
    }

    public get(id: number): Promise<DappEntity> {
        return this.repository.findOne(id, { relations: ["category", "externalLinks"] })
    }

    public find(query: FindManyOptions<DappEntity>): Promise<DappEntity[]> {
        return this.repository.find(query)
    }

    public save(model: DeepPartial<DappEntity>): Promise<DappEntity> {
        return this.repository.save(model)
    }

    public delete(id: number): Promise<DeleteResult> {
        return this.repository.delete(id)
    }
}
