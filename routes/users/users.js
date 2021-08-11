const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("In User Page")
});

module.exports = router;
