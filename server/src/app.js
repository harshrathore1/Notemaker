// app.js
import express from "express";
import mongoose from "mongoose";
import AuthMidleware from "./middlewares/AuthMidleware.js";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import cors from 'cors';

const app = express();

mongoose.connect(DB_CONNECT, { useNewUrlParser: true });

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/" ,AuthMidleware, apiProtected);

app.listen(PORT, () => console.log("Server is running"));