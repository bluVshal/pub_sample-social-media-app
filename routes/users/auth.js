const bcrypt  = require("bcrypt");
const router = require("express").Router();

const User = require("../../models/Users");

router.get("/", (req, res) => {
    res.send("Auth");
});

router.post("/register", async (req, res) => {
    const reqBody = req.body;
    try{
        //generate hashed password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        
        const newUser = new User({
            username: reqBody.username,
            password: reqBody.password,
            email: reqBody.email,
            
        });

        // save user and send response
        const user = await newUser.save();
        res.status(200).send("New User Saved");
    }

    catch(err){
        res.status(500).send('ERROR saving new user');
        console.err('ERROR: ', err);
    }

});

module.exports = router;