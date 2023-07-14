import { UserController } from "./controller/auth.controller";
import { Router } from "express";
import {BookController} from "./controller/book.controller";
import {AuthorController} from "./controller/author.controller";

export const routes = (router: Router) => {

    /**
     * User Authentication Routes
     */
    const userController = new UserController();

    // Register a new user
        router.post('/register',  userController.register);

    // Login and generate JWT token
        router.post('/login',  userController.login);

    // Get authenticated user's information
        router.get('/authenticated-user',  userController.authenticatedUser);

    // Update user's information
        router.put('/update-info',  userController.updateInfo);

    // Update user's password
        router.put('/update-password',  userController.updatePassword);

    // Logout user
        router.post('/logout', userController.logout);

    /**
     * routes for books
     */
    const bookController = new BookController();

    // Create a new book
        router.post('/books', bookController.createBook);

    // Get a book by ID
        router.get('/books/:bookId', bookController.getBook);

    // Update a book
        router.put('/books/:bookId', bookController.updateBook);

    // Delete a book
        router.delete('/books/:bookId', bookController.deleteBook);

    // Purchase a book
        router.post('/books/:bookId/purchase', bookController.purchaseBook);

    // Rent a book
        router.post('/books/:bookId/rent', bookController.rentBook);


    const authorController = new AuthorController();

    /**
     * Create a new author.
     */
    router.post('/authors', authorController.createAuthor);

    /**
     * Retrieve an author by ID.
     */
    router.get('/authors/:id', authorController.getAuthor);

    /**
     * Update an author.
     */
    router.put('/authors/:id', authorController.updateAuthor);

    /**
     * Delete an author.
     */
    router.delete('/authors/:id', authorController.deleteAuthor);

    /**
     * Retrieve books by author ID.
     */
    router.get('/authors/:id/books', authorController.getAuthorBooks);

}