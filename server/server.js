// Load env variables

if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// IMPORT DEPENDENCIES

const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const noteController = require("./controllers/notesController");
const usersController = require("./controllers/userController");
const cookieParser = require('cookie-parser');
const requireAuth = require("./middleware/requireAuth");

// Create an express app

const app = express();

// Configure express app

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());

// Connect to Database

connectToDb()

// Routing
app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.get("/notes", requireAuth, noteController.fetchNotes);
app.get("/notes/:id", requireAuth, noteController.fetchNote);
app.post("/notes", requireAuth, noteController.createNote);
app.put("/notes/:id", requireAuth, noteController.updateNote);
app.delete("/notes/:id", requireAuth, noteController.deleteNote);

// Start our server
app.listen(process.env.PORT);