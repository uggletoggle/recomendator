const express = require("express");
const bodyParser = require("body-parser");
const filmaffinityService = require('./filmaffinityService')
const service = filmaffinityService.service



const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.get("/", function(req, res) {

    service()
        .then(peliculas => {

            let listaPeliculas = peliculas

            res.json(listaPeliculas[Math.floor(Math.random() * 120)])
        })

});

app.listen(PORT, function() {
    console.log("Server escuchando en puerto 3000");
});