const express=require('express');
const { getNote, createNote, deleteNote, updateNote } = require('../controller/noteController');
const auth = require('../middleware/auth');
const notesRouter = express.Router();

notesRouter.get("/",auth,getNote)

notesRouter.post("/",auth,createNote)

notesRouter.delete("/:id",auth,deleteNote)

notesRouter.put("/:id",auth,updateNote)




module.exports=notesRouter