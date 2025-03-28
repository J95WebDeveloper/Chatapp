import express from "express";
import authController from "../controllers/authController.js";

const routes = express.Router();

routes.post("/register", authController.Register);
routes.post("/login", authController.Login);
routes.post("/logout", authController.Logout);

export default routes;
