// Listed global variables
var button = document.querySelector('#button');
var inputValue = document.querySelector('.inputValue');
var nameSlot = document.querySelector('.cityName');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var pic = document.querySelector('#placeholder-pic')
var uv = document.querySelector('.UV-index');
var olEl = document.getElementById("cityList");

//Primary function used to call both weather forecasts, format them into the HTML and store search to local storage
function getWeather(value, callee) {
    //Fetch call used to pull current weather data from openweathermap API
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+value+'&appid=e441c40d7c8015427300822498b53fc2')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() +1;
        var year = currentDate.getFullYear();
        var tempValue = data['main']['temp'];
        var humidityValue = data.main.humidity;
        var windValue = data['wind']['speed'];
        var tempConverted =  ((tempValue - 273.15) * 1.8 + 32);
        var tempRounded = Math.round(tempConverted);
        let weatherPic = data.weather[0].icon;
        pic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        pic.setAttribute("alt", data.weather[0].description);

        nameSlot.innerHTML =nameValue+" (" + month + "/" + day + "/" + year + ") ";
        temp.innerHTML = "Temp: "+tempRounded+"°F";
        humidity.innerHTML = "Humidity: "+humidityValue+"%";
        wind.innerHTML = "Wind Speed: "+windValue+" MPH";

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        //Fetch call used to pull current UVI data from openweather API
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=e441c40d7c8015427300822498b53fc2")
        .then(response => response.json())
        .then(data => {
        
        var uvValue = data.current.uvi;
        uv.innerHTML = uvValue;

        /*Function used to change the color of the <div> displaying the UVI data based
         on severity of current conditions (green/yellow/red) */
        function uviColorShift(){
                if (data.current.uvi < 4) {
                  uv.setAttribute("class","low UV-index");
              }
                  else if(data.current.uvi < 8) {
                      uv.setAttribute("class", "medium UV-index");
                  }
                  else {
                      uv.setAttribute("class", "high UV-index");
                  }
              };
       // Calls UVI <div> color changing function
       uviColorShift();

    // Function used to call data for 5 day forecast and format the results into the HTML
    function getWeather5Day() {
    // Fetch call to get the 5 day forecast data from openweathermap.org API
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+value+'&appid=e441c40d7c8015427300822498b53fc2')
    .then(response => response.json())
    .then(data => {
      var forecastEls = document.querySelectorAll(".forecast");
      for (i = 0; i < forecastEls.length; i++) {
          forecastEls[i].innerHTML = "";
          var forecastInd = i * 8 + 4;
          var forecastDate = new Date(data.list[forecastInd].dt * 1000);
          var forecastDay = forecastDate.getDate() ;
          var forecastMonth = forecastDate.getMonth() +1;
          var forecastYear = forecastDate.getFullYear();
          var forecastDateEl = document.createElement("p");
          forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
          forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" +forecastYear;
          forecastEls[i].append(forecastDateEl);

          var forecastWeatherEl = document.createElement("img");
          forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastInd].weather[0].icon + "@2x.png");
          forecastWeatherEl.setAttribute("alt", data.list[forecastInd].weather[0].description);
          forecastEls[i].append(forecastWeatherEl);
          var forecastTempEl = document.createElement("p");
          forecastTempEl.innerHTML = "Temp: " + Math.round((((data.list[forecastInd].main.temp) - 273.15) * 1.8 + 32)) + " °F";
          forecastEls[i].append(forecastTempEl);
          var forecastWindEl = document.createElement("p");
          forecastWindEl.innerHTML = "Wind: " + data.list[forecastInd].wind.speed + "MPH";
          forecastEls[i].append(forecastWindEl);
          var forecastHumidityEl = document.createElement("p");
          forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastInd].main.humidity + "%";
          forecastEls[i].append(forecastHumidityEl);
      }  
    })
}
      getWeather5Day();

if (callee == "input") {


  var inputHistory = document.querySelector(".inputValue").value;


var newEntry = {
    inputHistory: inputHistory
  };

  // Pulls search history from localstorage
  var cityLogStorage = window.localStorage.getItem("cityLog") || [];
  if (window.localStorage.getItem("cityLog") === null) {
      var cityLog =[];
  } else {
      var cityLog = JSON.parse(cityLogStorage)
  }

  // Pushes newly searched city to localstorage   
  cityLog.push(newEntry);

    window.localStorage.setItem("cityLog", JSON.stringify(cityLog));
    olEl.innerHTML="";

    getFromStorage();
}

        })
    })
}

// Function to pull search history from localstorage
function getFromStorage () {
    
    var cityLogStorage = window.localStorage.getItem("cityLog")|| [];
    console.log(cityLogStorage)
     if (window.localStorage.getItem("cityLog") === null) {
      var cityLog=[];
  } else {
      var cityLog = JSON.parse(cityLogStorage)

    // Creates <li> to display each city being pulled from local storage
    cityLog.forEach(function(inputHistory) {
        var liTag = document.createElement("li");
        liTag.setAttribute("type", "text");
        liTag.addEventListener("click", function () {
            getWeather(inputHistory.inputHistory);
        })
        liTag.textContent = inputHistory.inputHistory;
        console.log(inputHistory.inputHistory);
       
    
        var olEl = document.getElementById("cityList");
        olEl.appendChild(liTag);
      });
    }
}

// Sets up event listener to call getWeather function and pass in the city being searched
function setEventListeners () {
button.addEventListener('click',function(){
    var searchTerm = inputValue.value;
        getWeather(searchTerm, "input");
        
 })
}

// Initial page setup function
function init () {
setEventListeners();
getFromStorage();
}

init ();

//    const APIKey = "e441c40d7c8015427300822498b53fc2";




