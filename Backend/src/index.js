import express from "express";
import { PORT } from "./config/config.js";
import { connectDB } from "./config/dbConfig.js";
import CookiParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { app, server } from "./socket/socket.js";
import path from "path";

const __dirname = path.resolve();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(CookiParser());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

/*********   Deploy Code  ************/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Frontend/dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`Server is connected... ${PORT}`);
  connectDB();
});
