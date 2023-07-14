import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {User} from "./user.entity";
import {Book} from "./book.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Book, book => book.bookings)
    book: Book;

    @Column()
    date: Date;
}