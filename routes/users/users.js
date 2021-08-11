const router = require("express").Router();
const User = require('../../models/Users');
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
    const reqBody = req.body;

    if(reqBody.userId === req.params.id || reqBody.isAdmin) {
        if(reqBody.password){
            try{
                const salt = await bcrypt.genSalt(10);
                reqBody.password = await bcrypt.hash(reqBody.password, salt);
            } catch(err) {
                return res.status(500).send(err);
            }
        } 
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: reqBody,
            });
            res.status(200).json("Account has been updated")
        }
        catch(err){
            return res.status(500).send(err);
        }
    }
    else {
        return res.status(403).send("You are not allowed to modify this username");
    }  
});

//deactivate user
router.put("/deactivate/:id", async (req, res) => {
    const reqBody = req.body;
    var isActive = false;

    await User.find({"_id":reqBody.userId}, (err, res) => {
        if(res[0].active){
            isActive = res[0].active;
        }    
    });

    if(reqBody.userId === req.params.id || reqBody.isAdmin) {
        if(!isActive)
        {
            res.status(400).send("User not active");
        } else {
            try{
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: reqBody,
                });
                res.status(200).json("Account has been deactivated")
            }
            catch(err){
                return res.status(500).send(err);
            }
        }
    } else {
        return res.status(403).send("You are not allowed to modify this username");
    }  
});

// get all info about user
router.get("/:id", async(req, res) => {
   try{
        const user = await User.findById(req.params.id);
        const {password, ...otherDetails} = user._doc;
        res.status(200).json(otherDetails);
   } 
   catch(err){
       res.status(500).send("No user Found")
   }
});

module.exports = router;
