import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Booking} from "./booking.entity";
import {Renting} from "./renting.entity";
import {Purchase} from "./purchase.entity";
import {BookFile} from "./bookFile.entity";
import {Author} from "./author.entity";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Author, author => author.books)
    author: Author;

    @Column()
    publicationDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    purchasePrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    rentalPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    genre: string;


    @OneToMany(() => Booking, booking => booking.book)
    bookings: Booking[];

    @OneToMany(() => Renting, renting => renting.book)
    rentings: Renting[];

    @OneToMany(() => Purchase, purchase => purchase.book)
    purchases: Purchase[];

    @OneToMany(() => BookFile, bookFile => bookFile.book)
    bookFiles: BookFile[];
}