import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { TickerEntity } from "../database/entity/ticker.entity"
import { Repository } from "typeorm"

@Injectable()
export class TickerService {
    constructor(@InjectRepository(TickerEntity) private repository: Repository<TickerEntity>) {}

    public findByProjectId(id: number) {
        return this.repository.find({
            where: { project_id: id },
        })
    }
}
