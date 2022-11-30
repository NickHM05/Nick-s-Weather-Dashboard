//We need to store the value of the input\\
// The function could look like this. 
let city =$("#searchTerm").val();
// Next we will need to store the api key
const apiKey ="&appid=9dd247337ad4b6b047a2f9a30dacaf93";


let date = new Date();

$("searchTerm").keypress(function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click('show');
    }
});

$("#searchBtn").on("click", function() {

    $('#forecastH5').addClass('show');

    // will take the value from the user as input
    city =$("#searchTerm").val();

    //how to clear the input box
    $("#searchTerm").val("");
    console.log(city)
    //the url to call the api is used here
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    //var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=apiKey&units=imperial";

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){

        console.log(response)

        console.log(response.name)
        console.log(response.weather[0].icon)

    })
});
//use activity 21 and 22 to help you via line 35 to 39
//Need to pull the data from 2 api endpoints from the weathermap. one is the longitude and lat. The other is to pull the data from that search. 