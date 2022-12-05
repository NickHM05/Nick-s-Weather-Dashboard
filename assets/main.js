//We need to store the value of the input\\putCityputCity
// The function could look like this. 

//let city = $("#SearchTerm").val();
// the api key
//const apiKey = "&appid=9dd247337ad4b6b047a2f9a30dacaf93";

//our new function to collect the user input and display it in search history over old one cuz this one will be responsive
var apiKey = "9dd247337ad4b6b047a2f9a30dacaf93";
var inputValue = document.getElementById('cityinput');
var timeDisplayEl = $('#date1')
var button = document.querySelector('.btn');
var history = document.getElementById('searchHistory')
var storage = []


function displayTime() {
    var reformatDate = dayjs().format('dddd, MMMM D, YYYY');
    timeDisplayEl.text(reformatDate);
}
setInterval(displayTime,

    1000);


var fiveDay = [];

for (var i = 0; i < 5; i++) {
    let forecastDate = dayjs().add(i + 1, 'days').format('MMMM D, YYYY');
    fiveDay.push(forecastDate);
}
console.log(fiveDay)





function conversion(val) {
  return ((val-273.15)* 1.80 +32).toFixed(2)
}

button.addEventListener('click', getWeather);
button.addEventListener('click', setStorage);
button.addEventListener('click', displaydata)


function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + "&appid=" + apiKey)
        .then((response) => {
            response.json().then((data) => {
                var lat = data.coord.lat
                var long = data.coord.lon
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)
                    .then(response => response.json())
                    .then(day5data => {
console.log(day5data)


                        document.querySelector(".cardTodayCityName").innerHTML = day5data.city.name;

                        document.querySelector("#temp").innerHTML = `<span>${conversion(day5data.list[0].main.temp)} F</span>`;
                        document.querySelector('#Humidity').innerHTML = `<span>${day5data.list[0].main.humidity} %<span>`;
                        document.querySelector('#wind').innerHTML = `<span>${day5data.list[0].wind.speed} m/s<span>`;
                        document.querySelector('#icon').innerHTML = `<img src=http://openweathermap.org/img/wn/${day5data.list[0].weather[0].icon}.png>`;



                        //Day1   
                        document.querySelector("#date01").innerHTML = fiveDay[0];
                        document.querySelector("#temp0").innerHTML = `<span>${conversion(day5data.list[6].main.temp)} F</span>`;
                        document.querySelector('#Humidity0').innerHTML = `<span>${day5data.list[6].main.humidity} %<span>`;
                        document.querySelector('#Wind0').innerHTML = `<span>${day5data.list[6].wind.speed} m/s<span>`;
                        document.querySelector('#icon0').innerHTML = `<img src=http://openweathermap.org/img/wn/${day5data.list[6].weather[0].icon}.png>`;

                        //Day2
                        document.querySelector("#date2").innerHTML = fiveDay[1];
                        document.querySelector("#temp1").innerHTML = `<span>${conversion(day5data.list[14].main.temp)} F</span>`;
                        document.querySelector('#Humidity1').innerHTML = `<span>${day5data.list[14].main.humidity} %<span>`;
                        document.querySelector('#Wind1').innerHTML = `<span>${day5data.list[14].wind.speed} m/s<span>`;
                        document.querySelector('#icon1').innerHTML = `<img src=http://openweathermap.org/img/wn/${day5data.list[14].weather[0].icon}.png>`;

                        //Day3
                        document.querySelector("#date3").innerHTML = fiveDay[2];
                        document.querySelector("#temp2").innerHTML = `<span>${conversion(day5data.list[22].main.temp)} F</span>`;
                        document.querySelector('#Humidity2').innerHTML = `<span>${day5data.list[22].main.humidity} %<span>`;
                        document.querySelector('#Wind2').innerHTML = `<span>${day5data.list[22].wind.speed} m/s<span>`;
                        document.querySelector('#icon2').innerHTML = `<img src=http://openweathermap.org/img/wn/${day5data.list[22].weather[0].icon}.png>`;
                        //Day4
                        document.querySelector("#date4").innerHTML = fiveDay[3];
                        document.querySelector("#temp3").innerHTML = `<span>${conversion(day5data.list[30].main.temp)} F</span>`;
                        document.querySelector('#Humidity3').innerHTML = `<span>${day5data.list[30].main.humidity} %<span>`;
                        document.querySelector('#Wind3').innerHTML = `<span>${day5data.list[30].wind.speed} m/s<span>`;
                        document.querySelector('#icon3').innerHTML = `<img src=http://openweathermap.org/img/wn/${day5data.list[30].weather[0].icon}.png>`;

                        //Day5
                        document.querySelector("#date5").innerHTML = fiveDay[4];
                        document.querySelector("#temp4").innerHTML = `<span>${conversion(day5data.list[38].main.temp)} F</span>`;
                        document.querySelector('#Humidity4').innerHTML = `<span>${day5data.list[38].main.humidity} %<span>`;
                        document.querySelector('#Wind4').innerHTML = `<span>${day5data.list[38].wind.speed} m/s<span>`;
                        document.querySelector('#icon4').innerHTML = `<img src=http://openweathermap.org/img/wn/${day5data.list[38].weather[0].icon}.png>`;
                        //var weatherURL = "http://openweathermap.org/img/wn/";



                    });
            });
        });

}

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function setStorage() {
    var search = inputValue.value;
    getWeather(search);
    searchHistory.push(search);
    localStorage.setItem("search", JSON.stringify(searchHistory));

}
function displaydata() {

    document.querySelector("#searchHistory").innerHTML = `<button class="btn btn-primary">${searchHistory[0]}</button>`;
    displayUpdates();
};
//function displayUpdates()

/*function displayUpdates (){
    // Clearing any previously made child elements 
    if (firstLoad === false) {
        for (let i = 0; i < 5; i++) {
            tableContainer.removeChild(tableContainer.children[0]);
    } 
    
    };

}
*/