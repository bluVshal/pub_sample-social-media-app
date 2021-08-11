const bcrypt  = require("bcrypt");
const router = require("express").Router();

const User = require("../../models/Users");

router.get("/", (req, res) => {
    res.send("Auth");
});

//REGISTER
router.post("/register", async (req, res) => {
    const reqBody = req.body;
    try{
        //generate hashed password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        
        const newUser = new User({
            username: reqBody.username,
            password: hashedPassword,
            email: reqBody.email,
            
        });

        // save user and send response
        const user = await newUser.save();
        res.status(200).send("New User Saved");
    }

    catch(err){
        res.status(500).send('ERROR saving new user');
        console.log('ERROR: ', err);
    }
    finally{
        reqBody = {}
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    const reqBody = req.body
    try{
        const user = await User.findOne({ email: reqBody.email });
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare( reqBody.password, user.password)
        !validPassword && res.status(400).send("wrong password");

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).send('ERROR Logging In');
        console.log("ERROR: ", err);
    }
    finally{
        reqBody = {}
    }
})

module.exports = router;