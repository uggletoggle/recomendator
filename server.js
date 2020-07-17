const express = require("express");
const bodyParser = require("body-parser");
const filmaffinityService = require ('./filmaffinityService')
const service = filmaffinityService.service

service()
.then(res => console.log(res));
// const app = express();

// const PORT = 3000;

// app.use(bodyParser.json());

// app.get("/", function (req, res) {
//   res.send("Hola Mundo");
// });

// app.listen(PORT, function () {
//   console.log("Server escuchando en puerto 3000");
// });

