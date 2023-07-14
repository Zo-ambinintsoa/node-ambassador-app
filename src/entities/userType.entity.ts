import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
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
    @JoinTable({
        joinColumn: { name: 'roleId', referencedColumnName: 'id' }, // Join column configuration
        inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' } // Inverse join column configuration
    })
    permissions: Permission[];
}
