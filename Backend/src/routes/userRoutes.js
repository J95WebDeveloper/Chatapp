import express from "express";
import userController from "../controllers/userController.js";
import {storage} from '../utils/storage.js'
import multer from "multer";
import { protectRoutes } from "../middlewares/protectRoutes.js";


const routes = express.Router();

const upload = multer({ storage: storage });

routes.post("/upload", protectRoutes, upload.single("profile-image"), userController.updateUser);
routes.get("/getuser", protectRoutes, userController.getUser);

export default routes;
