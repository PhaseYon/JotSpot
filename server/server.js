// Load env variables

if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// IMPORT DEPENDENCIES

const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const noteController = require("./controllers/notesController");

// Create an express app

const app = express();

// Configure express app

app.use(express.json());
app.use(cors());

// Connect to Database

connectToDb()

// Routing

app.get("/notes", noteController.fetchNotes);
app.get("/notes/:id", noteController.fetchNote);
app.post("/notes", noteController.createNote);
app.put("/notes/:id", noteController.updateNote);
app.delete("/notes/:id", noteController.deleteNote);

// Start our server
app.listen(process.env.PORT);