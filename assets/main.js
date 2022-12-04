//We need to store the value of the input\\putCityputCity
// The function could look like this. 

//let city = $("#SearchTerm").val();
// the api key
//const apiKey = "&appid=9dd247337ad4b6b047a2f9a30dacaf93";

//our new function to collect the user input and display it in search history over old one cuz this one will be responsive
function addResult() {

    inputCity = document.getElementById("myInput").value;
    historyList = getInfo();
    var searchCity = $("<div>")
    searchCity.attr('id', inputCity)
    searchCity.text(inputCity)
    searchCity.addClass("h4")

    if (historyList.includes(inputCity) === false) {
        $(".history").append(searchCity)
    }
    $('.subtitle').attr("style", "display:inline")
    addInfo(inputCity);

};
//adding an event listener to search history code item
$(".history").on('click', function (event) {
    event.preventDefault();
    $(".subtitle").attr("style", "display:inline")
    document.getElementById("myInput").value = event.target.id;
    getResult();
});

//adding an event listener to search button to make my code more simple to understand this time and the event listener will go to the search button
document.getElementById("searchBtn").addEventListener("click", addResult);
document.getElementById("searchBtn").addEventListener("click", getResult);

//WHEN I view current weather...
//THEN I am presented with the city name, the date, the icon of weather conditions, the temperature, the humidity, the wind speed
function getResult() {

    $("five-day").empty();
    $(".city").empty()

    inputCity = document.getElementById("myInput").value;
    var countryCode = "US";
    var cityCode = inputCity;

    var geoLon;
    var geoLat;

    var cityname = $("<h>")
    cityname.addClass("h3")
    var temp = $("<div>")
    var humidity = $("<div>")
    var wind = $("<div>")
    var icon = $("<img>")
    icon.addClass("icon");
    var dateTime = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityname)
    $(".city").append(dateTime)
    $(".city").append(icon)
    $(".city").append(temp)
    $(".city").append(wind)
    $(".city").append(humidity)

    var thegeourl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=9dd247337ad4b6b047a2f9a30dacaf93"
    //console.log(thegeourl)

    //We then pass the requestUrl variable as an argument to the fetch() method, like in the following code:
    fetch(thegeourl)

        //converts the response into JSON. This will return the JSON formatted response as ahead in the code
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            geoLon = data[0].lon;
            geoLat = data[0].lat;

            console.log(geoLon)
            console.log(geoLat)
            //use Latti and Longi to fetch the weather
            var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + geoLat + "&lon=" + geoLon + "&appid=9dd247337ad4b6b047a2f9a30dacaf93";

            fetch(weatherUrl)
                //console.log(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    //console.log(data)

                    weatherIcon = data.current.weather[0].icon;
                    imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                    icon.attr('src', imgSrc)

                    cityname.text(cityCode);
                    //translate utc to the date
                    var date = new Date(date.current.dt * 1000);
                    dateTime.text("(" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

                    temp.text("Temperature: " + data.curent.temp + "°F");
                    humidity.text("Humidity: " + data.current.humidity + " %");
                    wind.text("Wind Speed: " + data.list.current.wind_speed + " MPH");

                    // WHEN I view future weather conditions for that city
                    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
                    //using the data from previous fetch and display the 5 day weather data
                    for (var i = 1; i < 6; i++) {

                        var blueContainer = $("<div>")
                        this["futureDate" + i] = $("<h>")
                        this["futureIcon" + i] = $("<img>")
                        this["futureTemp" + i] = $("<div>")
                        this["futureWind" + i] = $("<div>")
                        this["futureHumidity" + i] = $("<div>")

                        //translate utc to the date
                        this["forecastDay" + i] = new Date(data.daily[i].dt * 1000);

                        (this["futureDate" + i]).text(((this["forecastDay" + i]).getMonth() + 1) + "/" + (this["forecastDay" + i]).getDate() + "/" + (this["forecastDay" + i]).getFullYear());
                        (this["futureTemp" + i]).text("Temperature: " + data.daily[i].temp.day + " F");
                        (this["futureWind" + i]).text("Wind: " + data.daily[i].wind_speed + " MPH");
                        (this["futureHumidity" + i]).text("Humidity: " + data.daily[i].humidity + " %");
                        (this["weatherIcon" + i]) = data.daily[i].weather[0].icon;

                        DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon" + i]) + ".png";
                        (this["futureIcon" + i]).attr('src', DateimgSrc)

                        $(".five-day").append(blueContainer)
                        blueContainer.append((this["futureDate" + i]));
                        blueContainer.append((this["futureIcon" + i]));
                        blueContainer.append((this["futureTemp" + i]));
                        blueContainer.append((this["futureWind" + i]));
                        blueContainer.append((this["futureHumidity" + i]));

                        blueContainer.addClass("weather-card")
                    }

                })
        })
}



// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//get local storage info
function getInfo() {
    var currentList = localStorage.getItem("city");
    if (currentList !== null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
}
//add info to local
function addInfo(n) {
    var addedList = getInfo();

    if (historyList.includes(inputCity) === false) {
        addedList.push(n);
    }

    localStorage.setItem("city", JSON.stringify(addedList));
};
//render history
function renderInfo() {
    var historyList = getInfo();
    for (var i = 0; i < historyList.length; i++) {
        var inputCity = historyList[i];
        var searchCity = $("<div>")
        searchCity.attr('id', inputCity)
        searchCity.text(inputCity)
        searchCity.addClass("h4")

        $(".history").append(searchCity)
    }
};

renderInfo();
