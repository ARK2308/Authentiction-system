const userDB = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");


exports.userRegister = async (req , res) =>{
    const { firstname, lastname, email, password } = req.body;
    if(!firstname || !lastname || !email || !password ){
        res.status(400).json({error: "all fields are required"})
    }
    try {
        const preuser = await userDB.findOne({ email: email });
    
        if (preuser) {
          res.status(400).json({ error: "this user is already exist" });
        }  else {
          const userData = new userDB({
            firstname,
            lastname,
            email,
            password,
          })
           // here password hashing

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


// login controller 
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user exists
        const userValid = await userDB.findOne({ email: email });
        if (!userValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, userValid.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate authentication token
        const token = await userValid.generateuserAuthToken();

        // Send success response
        res.status(200).json({
            message: "Login successful",
            user: userValid,
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.userVerify = async(req , res) =>{
    try {
        const verifyUser = await userDB.findOne({ _id: req.userId });
        res.status(200).json(verifyUser);
      } catch (error) {
        res.status(400).json(error);
      }
}

exports.userLogout = async (req, res) => {
    try {
      req.rootUser.tokens = req.rootUser.tokens.filter((currentElement) => {
        return currentElement.token !== req.token;
      });
  
      req.rootUser.save();
      res.status(200).json({ message: "user Succesfully Logout" });
    } catch (error) {
      res.status(400).json(error);
    }
  };
