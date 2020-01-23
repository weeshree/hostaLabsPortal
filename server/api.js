
const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.send("welcome to the api");
})

router.get("/test", (req, res) => {
    res.send({message: "Noice! json."});
})


module.exports = router;