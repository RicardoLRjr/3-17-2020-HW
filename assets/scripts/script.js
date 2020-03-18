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
    
    
var long = response.coord.lon
var lat = response.coord.lat
var UVurl = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apikey + "&lat=" + lat + "&lon=" + long + "&cnt=1";
   

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
 })
})
})
