const express = require('express');
const app = express();
const api = require("./api.js");

app.use("/api", api);

app.use(express.static(__dirname+'./../../'));
app.listen(5000, ()=> {
    console.log("Server running on port 5000");
});