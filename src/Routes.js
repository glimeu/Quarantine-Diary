import express from 'express';

import Auth from './middlewares/Auth'; // Middleware de autenticação

import CommentsController from './controllers/CommentsController';

// Definir 2 tipos de rotas
const routes = express.Router();
const authRoutes = express.Router();

routes.use('/auth', Auth); // Colocar middleware de autenticação nas rotas que comção com /auth

/* { Rotas } */

routes.get('/comments', CommentsController.list);
routes.post('/comments', CommentsController.create);

routes.use('/auth', authRoutes); // Colocar /auth em todas as authRoutes
routes.use('/api', routes); // Colocar /api antes de todas as rotas

export default routes;
