require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");

switch (process.argv[2]) {

    // concert-this
    case "concert-this":
        Bands();
        break;

    //spotify-this-song
    case "spotify-this-song":
        //Spotify function
        break;

    //movie-this
    case "movie-this":
        Movie();
        break;

    //do-what-it-says
    case "do-what-it-says":
        // Do It function
        break;

    default: console.log("Invalid input");

}

// Concert Constructor
function Bands() {

    var artist = process.argv[3];

    this.searchConcert = function (artist) {
        var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


        request(url, function (err, response, body) {
            // Parse response into object
            var concertData = JSON.parse(body)[0];
            // console.log(concertData);

            var concertResponse = [
                "Venue: " + concertData.venue.name,
                "Location: " + concertData.venue.city + "," + concertData.venue.region,
                "Date: " + concertData.datetime,
            ].join("\n\n");


            //Append data
            fs.appendFile("log.txt", concertResponse, function (err) {
                if (err) throw err;
                console.log(concertResponse);
            })

        })
    }
    this.searchConcert(artist);

}


// Spotify Constructor
function Songs() {

}



// Movie Constructor
function Movie() {


    var movieName = process.argv[3];

    if (movieName === undefined) {
        var movieName = "mr+nobody";
    } 

        this.searchMovie = function (movieName) {
            var url = "http://www.omdbapi.com/?i=tt3896198&apikey=aed0bcbf&t=" + movieName;
            // console.log(url);


            request(url, function (err, response, body) {
                // Parse response into object
                var movieData = JSON.parse(body);
                // console.log(movieData);

                var movieResponse = [
                    "Title: " + movieData.Title,
                    "Release Date: " + movieData.Released,
                    "IMDB Rating: " + movieData.Ratings[0].Value,
                    "Rotten Tomatoes Rating: " + movieData.Ratings[1].Value,
                    "Production Country: " + movieData.Country,
                    "Languge: " + movieData.Language,
                    "Plot: " + movieData.Plot,
                    "Stars: " + movieData.Actors,
                ].join("\n");


                //Append data
                fs.appendFile("log.txt", movieResponse, function (err) {
                    if (err) throw err;
                    console.log(movieResponse);
                })

            })
        }
        this.searchMovie(movieName);

    }


// Do it function
