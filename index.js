const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {

    // takes in the city ID from the html form, display in console.
    var cityId = req.body.cityIdInput;
    console.log(cityId);

    //build up the URL for the JSON query, API Key is secret and needs to be obtained by signup 
    const units = "imperial";
    const apiKey = "d80845cc828106ba8005e5e86e8a8792";
    const url = "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&units=" + units + "&appid=" + apiKey;

    // this gets the data from Open WeatherAPI
    https.get(url, function(response){
        console.log(response.statusCode);

        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const windSpeed = weatherData.wind.speed;
            const windDeg = weatherData.wind.deg;
            const humidity = weatherData.main.humidity;
            const cloudiness = weatherData.clouds.all;

            // displays the output of the results
            res.write("<h1> The weather in " + city + ":</h1>");
            res.write("<p>Temperature: " + temp + "°F</p>");
            res.write("<p>Humidity: " + humidity + "%</p>");
            res.write("<p>Wind Speed: " + windSpeed + " mph, Wind Direction: " + windDeg + "°</p>");
            res.write("<p>Cloudiness: " + cloudiness + "%</p>");
            res.send();
        });
    });
})

//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
