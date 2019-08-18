import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("Category")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ length: 32 })
    public name: string
}
