import { Request, Response } from 'express';
import { Book } from '../entities/book.entity';
import { Purchase } from '../entities/purchase.entity';
import { Renting } from '../entities/renting.entity';
import {AppDataSource} from "../../ormconfig";
import {BookFile} from "../entities/bookFile.entity";

/**
 * Controller for handling book-related operations.
 */
export class BookController {
    private bookRepository = AppDataSource.getRepository(Book);
    private purchaseRepository = AppDataSource.getRepository(Purchase);
    private rentingRepository = AppDataSource.getRepository(Renting);
    private fileRepository = AppDataSource.getRepository(BookFile);

    /**
     * Creates a new book.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The created book.
     */
    async createBook(req: Request, res: Response) {
        try {
            const { title, authorId, publicationDate, purchasePrice, rentalPrice } = req.body;

            // Create a new Book entity
            const book = new Book();
            book.title = title;
            book.author = authorId;
            book.publicationDate = new Date(publicationDate);
            book.purchasePrice = purchasePrice;
            book.rentalPrice = rentalPrice;

            // Save the book to the database
            const savedBook = await this.bookRepository.save(book);

            if (req.file) {
                const fileId = req.file.id; // assuming the file ID is included in the request
                const file = await this.fileRepository.findOne({ where: { id: fileId } });
                if (file) {
                    savedBook.file = file;
                    await this.bookRepository.save(savedBook);
                }
            }

            res.status(201).json(savedBook);
        } catch (error) {
            console.error('Error creating book:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Retrieves a book by ID.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The retrieved book.
     */
    async getBook(req: Request, res: Response) {
        try {
            const id  = parseInt(req.params.bookId as string);

            // Find the book by its ID
            const book = await this.bookRepository.findOne({ where: { id }, relations: { author: true } });

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json(book);
        } catch (error) {
            console.error('Error retrieving book:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Updates a book.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The updated book.
     */
    async updateBook(req: Request, res: Response) {
        try {
            const id  = parseInt(req.params.bookId);
            const { title, authorId, publicationDate, purchasePrice, rentalPrice } = req.body;

            // Find the book by its ID
            const book = await this.bookRepository.findOne({ where: { id }, relations: { author: true } });

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Update the book details
            book.title = title;
            book.author = authorId;
            book.publicationDate = new Date(publicationDate);
            book.purchasePrice = purchasePrice;
            book.rentalPrice = rentalPrice;

            // Save the updated book to the database
            const updatedBook = await this.bookRepository.save(book);

            res.json(updatedBook);
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    /**
     * Deletes a book.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns A success message.
     */
    async deleteBook(req: Request, res: Response) {
        try {
            const id  = parseInt(req.params.bookId);

            // Find the book by its ID
            const book = await this.bookRepository.findOne({ where: { id }, relations: { author: true } });

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Delete the book from the database
            await this.bookRepository.remove(book);

            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            console.error('Error deleting book:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Purchases a book.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The created purchase.
     */
    async purchaseBook(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;

            // Retrieve the book from the database
            const book = await this.bookRepository.findOne({ where: { id : parseInt(bookId) }, relations: { author: true } });

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Create a new Purchase entity
            const purchase = new Purchase();
            purchase.user = userId;
            purchase.book = book;
            purchase.purchaseDate = new Date();

            // Save the purchase to the database
            const savedPurchase = await this.purchaseRepository.save(purchase);

            res.status(201).json(savedPurchase);
        } catch (error) {
            console.error('Error purchasing book:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Rents a book.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The created renting.
     */
    async rentBook(req: Request, res: Response) {
        try {
            const { userId, bookId, startDate, returnDate } = req.body;

            // Retrieve the book from the database
            const book = await this.bookRepository.findOne({ where: { id : parseInt(bookId) }, relations: { author: true } });

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Create a new Renting entity
            const renting = new Renting();
            renting.user = userId;
            renting.book = book;
            renting.startDate = new Date(startDate);
            renting.returnDate = new Date(returnDate);

            // Calculate the rental price in the BeforeInsert method of the Renting entity

            // Save the renting to the database
            const savedRenting = await this.rentingRepository.save(renting);

            res.status(201).json(savedRenting);
        } catch (error) {
            console.error('Error renting book:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
