//We need to store the value of the input\\putCityputCity
// The function could look like this. 

//let city = $("#SearchTerm").val();
// the api key
//const apiKey = "&appid=9dd247337ad4b6b047a2f9a30dacaf93";

//our new function to collect the user input and display it in search history over old one cuz this one will be responsive
function addResult() {

    inputCity = document.getElementById("myInput").value;
    historyList = getInfo();
    var CitySearch = $("<div>")
    CitySearch.attr('id', inputCity)
    CitySearch.text(inputCity)
    CitySearch.addClass("h4")

    if (historyList.includes(inputCity) === false) {
        $(".history").append(CitySearch)
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
    var cityCodex = inputCity;

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

    var thegeourl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCodex + "," + countryCode + "&limit=5&appid=9dd247337ad4b6b047a2f9a30dacaf93"
    console.log(thegeourl)

    //We then pass the requestUrl variable as an argument to the fetch() method, like in the following code:
    fetch(thegeourl)

        //converts the response into JSON. This will return the JSON formatted response as ahead in the code
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            geoLon = data[0].lon;
            geoLat = data[0].lat;

            //console.log(geoLon)
            //console.log(geoLat)
            //use Latti and Longi to fetch the weather
            var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + geoLat + "&lon=" + geoLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=9dd247337ad4b6b047a2f9a30dacaf93";

            fetch(weatherUrl)

                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)

                    weatherIcon = data.current.weather[0].icon;
                    imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                    icon.attr('src', imgSrc)

                    cityname.text(cityCodex);
                    //translate utc to the date
                    var date = new Date(date.current.dt * 1000);
                    dateTime.text("(" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

                    temp.text("Temperature: " + data.curent.temp + "°F");
                    humidity.text("Humidity: " + data.current.humidity + " %");
                    wind.text("Wind Speed: " + data.current.wind_speed + " MPH");

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
/*let date = new Date();

$("SearchTerm").keypress(function (event) {

    //keycode 13 is when tthe enter key is used on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click('show');
    }
});

$("#searchBtn").on("click", function () {

    $('#forecastH5').addClass('show');

    // will take the value from the user as input
    city = $("#SearchTerm").val();

    //how to clear the input box
    $("#SearchTerm").val("");
    console.log(city)
    //the url to call the api is used here
    //having &units=imperial is important because this will allow the temp to be returned as the right temp. It was a weird large number before that.
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey + "&units=imperial";
    //var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=apiKey&units=imperial";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .then(function (response) {

            console.log(response)

            console.log(response.name)
            console.log(response.weather[0].icon)

            let Temp = (response.main.temp);
            console.log(Temp)

            console.log(response.main.humidity)
            console.log(response.wind.speed)

            getCurrentConditions(response);
            getCurrentForecast(response);
            mList();


        })
});
function mList() {
    let listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
}



//The work in this function will result in The card showing the city and its Data on the webpage
function getCurrentConditions(response) {
    let Temp = (response.main.temp);
    Temp = (Temp);

    $("#currentCity").empty();

    // get and set the content of the cards for the user to see
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + Temp + "°F");
    const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed is: " + response.wind.speed + "MPH");
    const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // adding the data to the page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)
}

function getCurrentForecast() {

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (response) {

        console.log(response)
        console.log(response.dt)
        //empty() checks whether a list container is empty or not
        $("#forecast").empty();

        //This is where the variable to hold the response.list is
        let results = response.list;
        console.log(results)

        for (let i = 0; i < results.length; i++) {

            let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
            let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
            console.log(day);
            console.log(hour);

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {

                // get the temperature and convert to fahrenheit 
                let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                let Temp = Math.floor(temp);

                const card = $('<div>').addClass("card col-md-2 ml-4 bg-primary text-white");
                const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
                const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString("en-US"));
                const temperature = $('<p>').addClass("card-text forecastTemp").text("Temperature: " + Temp + "°F");
                const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

                const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);
            }
        }
    });

}*/