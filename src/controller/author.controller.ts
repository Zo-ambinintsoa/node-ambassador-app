import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';
import { Author } from '../entities/author.entity';
import {Book} from "../entities/book.entity";

export class AuthorController {
    private authorRepository = AppDataSource.getRepository(Author);
    private bookRepository = AppDataSource.getRepository(Book);

    /**
     * Creates a new author.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The created author.
     */
    public createAuthor = async (req: Request, res: Response) => {
        try {
            const { name, birthDate, nationality } = req.body;

            // Create a new Author entity
            const author = new Author();
            author.name = name;
            author.birthDate = new Date(birthDate);
            author.nationality = nationality;

            // Save the author to the database
            const savedAuthor = await this.authorRepository.save(author);

            res.status(201).json(savedAuthor);
        } catch (error) {
            console.error('Error creating author:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    /**
     * Retrieves an author by ID.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The retrieved author.
     */
    public getAuthor = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string);

            // Find the author by ID
            const author = await this.authorRepository.findOne({ where : { id } });

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }

            res.json(author);
        } catch (error) {
            console.error('Error retrieving author:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    /**
     * Retrieves books by author ID.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The books associated with the author.
     */
    public getAuthorBooks = async (req: Request, res: Response) => {
        try {
            const authorId = parseInt(req.params.id as string | '0');

            // Find the author by ID
            const author = await this.authorRepository.findOne({ where : { id : authorId } });

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }

            // Retrieve the books associated with the author
            const books = await this.bookRepository.find({ where: { author: true } });

            res.json(books);
        } catch (error) {
            console.error('Error retrieving author books:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    /**
     * Updates an author.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns The updated author.
     */
    public updateAuthor = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string);
            const { name, birthDate, nationality } = req.body;

            // Find the author by ID
            const author = await this.authorRepository.findOne({ where : { id } });

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }

            // Update the author details
            author.name = name;
            author.birthDate = new Date(birthDate);
            author.nationality = nationality;

            // Save the updated author to the database
            const updatedAuthor = await this.authorRepository.save(author);

            res.json(updatedAuthor);
        } catch (error) {
            console.error('Error updating author:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    /**
     * Deletes an author.
     *
     * @param req - The Express Request object.
     * @param res - The Express Response object.
     * @returns A delete message.
     */
    public deleteAuthor = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string);

            // Find the author by ID
            const author = await this.authorRepository.findOne({ where : { id } });

            if (!author) {
                return res.status(404).json({ message: 'Author not found' });
            }

            // Delete the author from the database
            await this.authorRepository.remove(author);

            res.json({ message: 'Author deleted successfully' });
        } catch (error) {
            console.error('Error deleting author:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
