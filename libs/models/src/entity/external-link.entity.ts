import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("ExternalLink")
export class ExternalLinkEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ length: 32 })
    public name: string

    @Column("text")
    public url: string
}
