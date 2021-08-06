var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var nameSlot = document.querySelector('.cityName');
var wind = document.querySelector('.wind');
var temp = document.querySelector('.temp');

button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=e441c40d7c8015427300822498b53fc2')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var windValue = data['wind']['speed'];
        var tempConverted =  ((tempValue - 273.15) * 1.8 + 32);
        var tempRounded = Math.round(tempConverted);

        nameSlot.innerHTML ="City: "+nameValue;
        temp.innerHTML = "Temp: "+tempRounded+"°";
        wind.innerHTML = "Wind Speed: "+windValue+" MPH"
    })
})

















/*
function loadAll() {
    
    const APIKey = "e441c40d7c8015427300822498b53fc2";

    console.log(APIKey);

    var cityDateDisplay = "";
    const cityName = "atlanta"
    
    var nameList = document.getElementById("city-name");
    var currentPicList = document.getElementById("current-pic");
    var currentTempList = document.getElementById("temp");
    var currentHumidityList = document.getElementById("hum");
    var currentWindList = document.getElementById("wind-speed");
    var currentUVList = document.getElementById("UV-index");
    var cityList = document.getElementById("enter-city");
    var searchList = document.getElementById("search-button");
    var clearList = document.getElementById("clear-history");
    var historyList = document.getElementById("history");
    var fivedayList = document.getElementById("fiveday-header");
    var todayweatherList = document.getElementById("today-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


function getWeather(cityName) {
    console.log(cityName);
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
    
       })  
     //  getWeather();
    } 
    getWeather();
}
//getWeather();
//console.log(getWeather);

  //  }
//}




document.querySelector('#search-btn').addEventListener('click', loadAll);


//loadAll();

*/