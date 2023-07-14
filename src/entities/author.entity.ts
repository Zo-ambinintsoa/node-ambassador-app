import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Book} from "./book.entity";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    biography: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ nullable: true })
    nationality: string;

    // ... add other author properties as needed

    @OneToMany(() => Book, book => book.author)
    books: Book[];
}