$(document).ready(function() {
 var apikey = "6b0554675e4a7b67fa6be5b8b95066ba";
 document.getElementById("city-input").value = localStorage.getItem("cityInput")
 var cityInput = document.getElementById("city-input").value;
 var response = (JSON.parse(localStorage.getItem("response-value")))
cityWeather();
UVweather();
fiveDayGenerate();
savedCityList();

function savedCityList() {
    var cityInput = document.getElementById("city-input").value;
    var savedCity = $("<li class='list-group-item'></li>")
    savedCity.text(cityInput)
    $("#cityList").append(savedCity)
}
 function cityWeather(){
    var cityInput = document.getElementById("city-input").value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + cityInput +"&units=imperial&appid=" + apikey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
    $("#city").text(response.name)
    $("#temp").text(response.main.temp)
    $("#humidity").text(response.main.humidity)
    $("#wind-speed").text(response.wind.speed)
    localStorage.setItem("cityInput", cityInput)
}
      )
    }
function UVweather(){
    console.log(response)
    var long = response.coord.lon
    var lat = response.coord.lat
    var UVurl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apikey + "&lat=" + lat + "&lon=" + long + "&cnt=1";

    $.ajax({
        url: UVurl,
        method: "GET" 
    }).then(function(UV) {
    $("#UVindex").text(UV[0].value)
   var UVindex = (UV[0].value)
   if (UVindex <= 2){
    $("#UVindex").attr("style", "background-color: green")}
    else if (UVindex > 2 && UVindex <= 5 ){
        $("#UVindex").attr("style", "background-color: yellow")
}
else if (UVindex > 5 && UVindex <= 7 ){
    $("#UVindex").attr("style", "background-color: orange")
}
else if (UVindex > 7 && UVindex <= 10){
$("#UVindex").attr("style", "background-color: red")}
else if (UVindex > 10){
    $("#UVindex").attr("style", "background-color: violet")}
    })

}
function fiveDayGenerate(){  
    var cityInput = document.getElementById("city-input").value;
    var dayURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityInput + "&units=imperial&appid="+ apikey; 
    $.ajax({
    url: dayURL,
    method: "GET" 
}).then(function(fiveDay){  
var weathericon1 = fiveDay.list[0].weather[0].icon
var weatherUrl1 = "http://openweathermap.org/img/wn/" + weathericon1 + "@2x.png"
//  h/t to https://www.reddit.com/r/FreeCodeCamp/comments/4con5s/how_do_i_use_the_icon_given_in_the_open_weather/
$("#1date").text(fiveDay.list[0].dt_txt)
$("#1weather").html("<img src='" + weatherUrl1  + "'>")
$("#1temp").text(fiveDay.list[0].main.temp)
$("#1humidity").text(fiveDay.list[0].main.humidity)

var weathericon2 = fiveDay.list[1].weather[0].icon
var weatherUrl2 = "http://openweathermap.org/img/wn/" + weathericon2 + "@2x.png"   
$("#2date").text(fiveDay.list[1].dt_txt)
$("#2weather").html("<img src='" + weatherUrl2  + "'>")
$("#2temp").text(fiveDay.list[1].main.temp)
$("#2humidity").text(fiveDay.list[1].main.humidity)

var weathericon3 = fiveDay.list[2].weather[0].icon
var weatherUrl3 = "http://openweathermap.org/img/wn/" + weathericon3 + "@2x.png"
$("#3date").text(fiveDay.list[2].dt_txt)
$("#3weather").html("<img src='" + weatherUrl3  + "'>")
$("#3temp").text(fiveDay.list[2].main.temp)
$("#3humidity").text(fiveDay.list[2].main.humidity)

var weathericon4 = fiveDay.list[3].weather[0].icon
var weatherUrl4 = "http://openweathermap.org/img/wn/" + weathericon4 + "@2x.png"
$("#4date").text(fiveDay.list[3].dt_txt)
$("#4weather").html("<img src='" + weatherUrl4  + "'>")
$("#4temp").text(fiveDay.list[3].main.temp)
$("#4humidity").text(fiveDay.list[3].main.humidity)

var weathericon5 = fiveDay.list[4].weather[0].icon
var weatherUrl5 = "http://openweathermap.org/img/wn/" + weathericon5 + "@2x.png"
$("#5date").text(fiveDay.list[4].dt_txt)
$("#5weather").html("<img src='" + weatherUrl5  + "'>")
$("#5temp").text(fiveDay.list[4].main.temp)
$("#5humidity").text(fiveDay.list[4].main.humidity)
})
};
 
$("#Search").click(function(event){
event.preventDefault(); 
cityWeather();
localStorage.setItem("response-value", JSON.stringify(response))
UVweather();
fiveDayGenerate();
savedCityList();
})
})
