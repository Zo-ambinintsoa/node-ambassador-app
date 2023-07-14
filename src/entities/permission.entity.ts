import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import {UserType} from "./userType.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    permissionType: string;

    @Column()
    modelTypes: string[];

    @ManyToMany(() => UserType)
    @JoinTable()
    userTypes: UserType[];
}