$(document).ready(function() {
 var apikey = "6b0554675e4a7b67fa6be5b8b95066ba";

$("#Search").click(function(event){
event.preventDefault(); 

 var cityInput = document.getElementById("city-input").value;
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
 "q=" + cityInput +"&units=imperial&appid=" + apikey;
console.log(cityInput)

 $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    // Log the queryURL
    console.log(queryURL);
    var long = response.coord.lon
    console.log(long)
    var lat = response.coord.lat
    console.log(lat)
    var UVurl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apikey + "&lat=" + lat + "&lon=" + long + "&cnt=1";
    console.log(UVurl)
    // Log the resulting object
    console.log(response);
    $("#city").text(response.name)
    $("#temp").text(response.main.temp)
    $("#humidity").text(response.main.humidity)
    $("#wind-speed").text(response.wind.speed)
    
    $.ajax({
        url: UVurl,
        method: "GET" 
    }).then(function(UV) {
        console.log(UV[0].value)
    $("#UVindex").text(UV[0].value)
    })
  })
 })
})
