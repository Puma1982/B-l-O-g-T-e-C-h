const express = require("express"); //1)create express server(http and create a server just in express)
const app = express(); //2)execute this express
const dotenv = require("dotenv"); // dotenv to call the hide password and username from .env file
const mongoose = require("mongoose"); //we must import mongoose
const authRoute = require("./routes/auth"); //we must indicate in index than we can use postman
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");               //(yarn add multer) this is a library for images
const path = require("path");


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));     //MAKE THIS AMAGES FOLDER PUBLIC   //AND I USED MY URL IMAGES( "/images")
//var__dirname :stringify;
//I replaced the localhost url with the .env url
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log("Connection error: " + err)) //if there is any error catch and console log it.
  .then(console.log("Connected to MongoDB")); //i connect this url

const storage = multer.diskStorage({                      //create images storage
  
  destination: (req, file, cb) => {                  //(cb) = call back f
    cb(null, "images");
  },
  
  filename: (req, file, cb) => {                         //request+file+callback function
    cb(null, req.body.name);                             //we will send this request to our client file
  },                                                     //callback function take care of our errors
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {             //WHEN WE UPLOAD SOMETHING WE USE THIS URL
  res.status(200).json("File uploaded successfully");                  //WHEN WE UPLOAD SOMETHING WE USE FILE
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
//to use the application we can indicate any port number

app.listen("5000", () => {
  //3)we must send to any port we want
  console.log("Backend is running."); //4)console log this connection
});
