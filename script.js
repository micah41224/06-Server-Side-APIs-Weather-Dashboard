function loadAll() {
    
    const APIKey = "e441c40d7c8015427300822498b53fc2";
    var cityName = "atlanta"
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        console.log(queryURL);
}

loadAll();