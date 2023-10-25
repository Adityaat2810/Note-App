const express = require("express");
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/notesRoutes");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express()
const dotenv=require("dotenv");
dotenv.config();

const cors= require('cors')
app.use(cors());


app.use((req,res,next)=>{
   console.log("HTTP methods - "+req.method+", URL ",req.url);
   next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use("/users", userRouter);
app.use("/note", notesRouter);



app.get("/", (req, res) => {
  return res.status(200).json({
    success : true
  })
});

const PORT = process.env.PORT || 5000
const url = process.env.MONGO_URI

console.log(url)

app.listen(PORT, async(req,res)=>{
    console.log("Server Started");
    mongoose.connect(url);
})

// mongoose
//   .connect(url)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Server is running on port "+PORT);
//       console.log("MongoDB connected successfully")
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/**
 * data base -> user -> admin
 *      pass -> adminpass
 */
