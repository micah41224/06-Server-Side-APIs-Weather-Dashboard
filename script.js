var button = document.querySelector('#button');
var inputValue = document.querySelector('.inputValue');
var nameSlot = document.querySelector('.cityName');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var pic = document.querySelector('#placeholder-pic')
var uv = document.querySelector('.UV-index');
var olEl = document.getElementById("cityList");


//button.addEventListener('click',function(){
    //Below function was recently added
function getWeather(value, callee) {
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

        nameSlot.innerHTML ="City: "+nameValue+" (" + month + "/" + day + "/" + year + ") ";
        temp.innerHTML = "Temp: "+tempRounded+"°";
        humidity.innerHTML = "Humidity: "+humidityValue+"%";
        wind.innerHTML = "Wind Speed: "+windValue+" MPH";

        let lat = data.coord.lat;
        let lon = data.coord.lon;

       // console.log(lat);
        //console.log(lon);

        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=e441c40d7c8015427300822498b53fc2")
        .then(response => response.json())
        .then(data => {
        
        var uvValue = data.current.uvi;
        uv.innerHTML = uvValue;
        //console.log(data);

        function uviColorShift(){
            //function uviColorShift() {
                if (data.current.uvi < 4) {
                  uv.classList.add("low");
              }
                  else if(data.current.uvi < 8) {
                      uv.classList.add("medium");
                  }
                  else {
                      uv.classList.add("high");
                  }
            
              };

       uviColorShift();

       
if (callee == "input") {


  var inputHistory = document.querySelector(".inputValue").value;

/*
    var cityLog = JSON.parse(window.localStorage.getItem("cityLog")) || [];
    var newEntry = {
      inputHistory: inputHistory
    };
  

    cityLog.push(newEntry);
*/
var newEntry = {
    inputHistory: inputHistory
  };

  var cityLogStorage = window.localStorage.getItem("cityLog")|| [];
    var cityLog = JSON.parse(cityLogStorage) 
  cityLog.push(newEntry);

    window.localStorage.setItem("cityLog", JSON.stringify(cityLog));
    olEl.innerHTML="";
getFromStorage();
}
    
    //console.log(cityLog);
/*
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
*/
        })
    })
}







function getFromStorage () {
    
    var cityLogStorage = window.localStorage.getItem("cityLog")|| [];
    var cityLog = JSON.parse(cityLogStorage) 
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
    /*
      var newEntry = {
      inputHistory: inputHistory
    };
  

    cityLog.push(newEntry);
*/
}

function setEventListeners () {
//Recently changed:
button.addEventListener('click',function(){
    var searchTerm = inputValue.value;
        getWeather(searchTerm, "input");
        
 })
}

function init () {
setEventListeners();
getFromStorage();
}

init ();

//    const APIKey = "e441c40d7c8015427300822498b53fc2";

