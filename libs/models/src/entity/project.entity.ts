import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { CategoryEntity } from "./category.entity"
import { ProjectStatus, ProjectType } from "@parachain-tracker/api-interfaces"
import { ExternalLinkEntity } from "./external-link.entity"

@Entity("Project")
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column("int", { default: 0 })
    public type: ProjectType

    @Column("tinyint", { default: false })
    public featured: boolean

    @Column({ length: 256 })
    public name: string

    @Column({ length: 256 })
    public developer: string

    @Column("text")
    public description: string

    @Column("int")
    public status: ProjectStatus

    @Column("text")
    public link: string

    @Column("int")
    public stars: number

    @Column("int")
    public commits: number

    @Column({ length: 32 })
    public network: string

    @Column("text", { default: "" })
    public tagline: string

    @ManyToMany(type => ExternalLinkEntity, { cascade: true })
    @JoinTable()
    public externalLinks

    @JoinColumn()
    @OneToOne(type => CategoryEntity)
    public category: CategoryEntity
}
