import express from 'express'
import messageController from '../controllers/messageController.js';
import { protectRoutes } from '../middlewares/protectRoutes.js';


const routes = express.Router()

routes.post('/send/:id', protectRoutes, messageController.sendMessage)
routes.get('/:id', protectRoutes, messageController.getMessage)

export default routes