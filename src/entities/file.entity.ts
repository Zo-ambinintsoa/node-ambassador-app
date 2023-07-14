import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Book} from "./book.entity";


@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.files)
    book: Book;

    @Column()
    type: string;

    @Column()
    size: string;

    @Column({ nullable: true })
    url: string;

    // ... add other file properties as needed
}