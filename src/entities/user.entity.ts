import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToMany, JoinTable, OneToMany} from 'typeorm';

import {UserType} from "./userType.entity";
import {Booking} from "./booking.entity";
import {Renting} from "./renting.entity";
import {Purchase} from "./purchase.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    picture: string;

    @ManyToMany(() => UserType)
    @JoinTable()
    userTypes: UserType[];

    @OneToMany(() => Booking, booking => booking.user)
    bookings: Booking[];

    @OneToMany(() => Renting, renting => renting.user)
    rentings: Renting[];

    @OneToMany(() => Purchase, purchase => purchase.user)
    purchases: Purchase[];

    @BeforeInsert()
    validateData() {
        // Validate username
        if (this.username.length < 5) {
            throw new Error('Username must be at least 5 characters long');
        }

        // Validate password
        if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new Error('Invalid email address');
        }
    }
}