import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProjectEntity } from "./project.entity"
import { TickerCoord, TickerTrend } from "@parachain-tracker/api-interfaces"

@Entity("Ticker")
export class TickerEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ length: 32 })
    public name: string

    @Column()
    public project_id: number

    @Column("simple-json")
    public coords: TickerCoord[]

    @Column("simple-json")
    public trends: TickerTrend[]

    @ManyToOne(type => ProjectEntity)
    @JoinColumn({ name: "project_id", referencedColumnName: "id" })
    public project: ProjectEntity
}
