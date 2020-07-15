const request = require("request");
const cheerio = require("cheerio");

class Pelicula {
    constructor(titulo, rating, cantidad) {
        this.titulo = titulo;
        this.rating = rating;
        this.cantidad = cantidad;
    }

    toString() {
        return `${this.titulo} - Rating: ${this.rating} - Cantidad de votos: ${this.cantidad}`;
    }
}

function traerPeliculas(genero = "", desde = "", hasta = "", pais = "") {
    const baseURI = "https://www.filmaffinity.com/es/topgen.php?";

    return new Promise((resolve) => {
        const result = request(
            `${baseURI}genre=${genero}&fromyear=${desde}&toyear=${hasta}&country=${pais}&nodoc&notvse`,
            (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);

                    const titulos = traerListaElementos($, "mc-title");
                    const rating = traerListaElementos($, "avg-rating");
                    const cantidad = traerListaElementos($, "rat-count");

                    const peliculas = [];

                    titulos.forEach((element, i) => {
                        peliculas.push(new Pelicula(titulos[i], rating[i], cantidad[i]));
                    });

                    resolve(peliculas);
                }
            }
        );
    });
}

function traerListaElementos($, claseCSS) {
    const oCheerio = $(".".concat(claseCSS)).map((i, el) => {
        return $(el).text();
    });

    return oCheerio.get();
}

async function main() {
    const peliculas = [];
    const generos = ["AV", "INT", "AC", "DR"];

    generos.forEach(async(genero) => {
        const peliculasPorGenero = await traerPeliculas((genero = genero));
        peliculas.push.apply(peliculas, peliculasPorGenero);

        // Exponer los datos a una API con Express
    });
}

main();

const prueba = "esto es una constante de prueba"