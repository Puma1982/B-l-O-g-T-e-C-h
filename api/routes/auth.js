const router = require("express").Router(); //to import route i used framework express
const User = require("../models/User"); //we will use here just user inside models folder
const bcrypt = require("bcrypt");

//REGISTER

//:create something we use a post method and if updating existing model we use put , to delete delete method and if fetching some data and you dont changing anything we use get method
//request and response(req , res) what we sending to our server
router.post("/register", async (req, res) => {
  //"async and await make promises easier to write"
  //async makes a function return a Promise
  try {
    const salt = await bcrypt.genSalt(10);
    //await makes a function wait for a Promise
    const hashedPass = await bcrypt.hash(req.body.password, salt); //src(https://www.npmjs.com/package/bcrypt)
    //https://attacomsian.com/blog/nodejs-password-hashing-with-bcrypt
    const newUser = new User({
      //we are using here user schema
      username: req.body.username, //if inside this request we hade just body it s gonna take whatever we sent here (exp:username password...)
      email: req.body.email, //but i our case we specificated to just email username password
      password: hashedPass, //we changed ( password: req.body.password) with (password: ashedPass)
    });

    const user = await newUser.save(); //this function to save the user
    res.status(200).json(user); //status 200 it successs password and username
  } catch (err) {
    res.status(500).json(err); //error 500 it mean something wrong with mongodb or express server
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc; //this function for not send password to users(it is not gonna take passwords it s gonna take other properties)
    res.status(200).json(others); //(._doc)just doc api (username-email-id)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; //must export router

//in postmnan(localhost:3000/api/auth/register)






