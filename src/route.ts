import {authenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword} from "./controller/auth.controller";
import {Router} from "express";

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

}