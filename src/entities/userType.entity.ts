import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "./permission.entity";

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    code: string;

    @ManyToMany(() => Permission)
    permissions: Permission[];
}
