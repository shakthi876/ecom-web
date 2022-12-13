const User = require("../models/User");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require('express-jwt');





exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg }); // errors array have msg
  }


  const { email } = req.body;
  let existinguser;
  try {
    existinguser = await User.findOne({ email: email }); //Finding the entered email
  } catch (err) {
    console.log("error is", err);
  }
  // if entered email is in dB
  if (existinguser) {
    return res
      .status(422)
      .json({ error: "User already exists!! Sign In Instead...",
      link:"<Link to='/signin'>Login here </Link>" });
  }

//console.log("req.body from auth controller",req.body);

  const user = new User(req.body);
  user.password = req.body.password; //passing password to virtual function(password) in database - to hash the value(encrypted pass nd salt value created for this user)
 await user.save((err, user) => {
    if (err) {
      console.log("error is :", err);
      return res.status(400).json({ err: "Cannot save user" });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};




exports.signin = (req,res)=>{

    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg }); // errors array have msg
  }
    
  
  const {email,password}= req.body
//    console.log(email);
  User.findOne({email},async (err,user)=>{
    if (err || !user) {
        return res.status(400).json({
          error: "User email does not exists...!"
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
      
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie 1st parameter is name and 2nd is value
    res.cookie("token", token, { expire: new Date() + 9999 }); //because of cookie parser we can store cookies
    //created the cookie with key(token) value(token's value)

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
    
  })

}

exports.signout = (req,res) =>{
    res.clearCookie("token"); //because of cookie parser we can clear cookies
    return res.json({message:"signout successful!!"})
}


//Protect the route
//check for token, decoded JWT payload is available on the request object. here requested object is auth
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET, 
    userProperty : 'auth', //req.auth gives id of that token(_id,iat)
    algorithms: ["HS256"],
});




//custom middlewares (must have next())


//is token's id and requested user's id are same so that he/she change their profile
exports.isAuthenticated = (req, res, next) => {
    //anyone false all false
   //this req.profile is from router.param(userId)
    let checker = req.profile && req.auth && req.profile._id == req.auth._id; //req.profile set from frontend after logged in
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED !!!"
      });
    }
    next();
  };
  
exports.isAdmin = (req, res, next) => {
    //role=1 then admin else regular user
    //profile is set from frontend after logged in
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "You are not admin, ACCESS DENIED!!!"
      });
    }
    next();
  };
