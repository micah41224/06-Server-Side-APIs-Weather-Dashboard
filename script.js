var button = document.querySelector('#button');
var inputValue = document.querySelector('.inputValue');
var nameSlot = document.querySelector('.cityName');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var pic = document.querySelector('#placeholder-pic')
var uv = document.querySelector('.UV-index');


button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=e441c40d7c8015427300822498b53fc2')
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        var nameValue = data['name'];
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() +1;
        var year = currentDate.getFullYear();
        var tempValue = data['main']['temp'];
        var humidityValue = data.main.humidity;
        //console.log(humidityValue);
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

        console.log(lat);
        console.log(lon);

        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=e441c40d7c8015427300822498b53fc2")
        .then(response => response.json())
        .then(data => {
        
        //var uvValue = data[0].value;
        var uvValue = data.current.uvi;
        uv.innerHTML = uvValue;
        console.log(data);

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

        })
    })
})

/*
function uviColorShift(){
    //function uviColorShift() {
        if (uv.value < 4) {
          uv.classList.add("low");
      }
          else if(uv.value < 8) {
              uv.classList.add("medium");
          }
          else {
              uv.classList.add("high");
          }
    
      };
      */


/*

button.addEventListener('click',function(){
//function uviColorShift() {
    if (uvValue < 4) {
      uv.addClass("low");
  }
      else if(uvValue < 8) {
          uv.addClass("medium");
      }
      else {
          uv.addClass("high");
      }

  });

  
*/






//    const APIKey = "e441c40d7c8015427300822498b53fc2";

   