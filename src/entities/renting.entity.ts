import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "./user.entity";
import {Book} from "./book.entity";

@Entity()
export class Renting {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.rentings)
    user: User;

    @ManyToOne(() => Book, book => book.rentings)
    book: Book;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}