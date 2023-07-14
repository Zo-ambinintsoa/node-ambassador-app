import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import moment from 'moment';

@Entity()
export class Renting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    returnDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => User, user => user.rentings)
    user: User;

    @ManyToOne(() => Book, book => book.rentings)
    book: Book;

    // ... add other renting properties and relationships as needed

    @BeforeInsert()
    calculateRentalPrice() {
        if (this.startDate && this.returnDate) {
            const totalWeeks = moment(this.returnDate).diff(moment(this.startDate), 'weeks');
            this.price = totalWeeks * this.book.rentalPrice;
        }
    }
}
