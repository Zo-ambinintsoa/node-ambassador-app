import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "./user.entity";
import {Book} from "./book.entity";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.purchases)
    user: User;

    @ManyToOne(() => Book, book => book.purchases)
    book: Book;

    @Column()
    purchaseDate: Date;

    // ... add other purchase properties as needed
}