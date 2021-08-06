var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var nameSlot = document.querySelector('.cityName');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var pic = document.querySelector('#placeholder-pic')


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
        console.log(humidityValue);
        var windValue = data['wind']['speed'];
        var tempConverted =  ((tempValue - 273.15) * 1.8 + 32);
        var tempRounded = Math.round(tempConverted);
        let weatherPic = data.weather[0].icon;
        pic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        pic.setAttribute("alt", data.weather[0].description);

        nameSlot.innerHTML ="City: "+nameValue+" (" + month + "/" + day + "/" + year + ") ";
        temp.innerHTML = "Temp: "+tempRounded+"°";
        humidity.innerHTML = "Humidity: "+humidityValue+"%";
        wind.innerHTML = "Wind Speed: "+windValue+" MPH"
    })
})













//    const APIKey = "e441c40d7c8015427300822498b53fc2";

   