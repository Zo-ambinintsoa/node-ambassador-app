import {authenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {Request, Response, Router} from "express";
import {BookController} from "./controller/book.controller";

export const routes = (router: Router) => {

    /**
     * User Authentication Routes
     */
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', authenticatedUser);
    router.post('/api/logout', Logout);
    router.put('/api/user/update', UpdateInfo);
    router.put('/api/user/update/password', UpdatePassword);

    const bookController = new BookController()

    /**
     * routes for books
     */
    router.post('/books', bookController.createBook);

    router.get('/books/:bookId', bookController.getBook);

    router.put('/books/:bookId', bookController.updateBook);

    router.delete('/books/:bookId', bookController.deleteBook);

    router.post('/books/:bookId/purchase', bookController.purchaseBook);

    router.post('/books/:bookId/rent', bookController.rentBook);

}