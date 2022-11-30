//We need to store the value of the input\\
// The function could look like this. 
let city =$("#SearchTerm").val();
// Next we will need to store the api key
const apiKey ="&appid=9dd247337ad4b6b047a2f9a30dacaf93";


let date = new Date();

$("SearchTerm").keypress(function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click('show');
    }
});

$("#searchBtn").on("click", function() {

    $('#forecastH5').addClass('show');

    // will take the value from the user as input
    city =$("#SearchTerm").val();

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
    .then(function (response){

        console.log(response)

        console.log(response.name)
        console.log(response.weather[0].icon)

        let Temp = (response.main.temp);
        console.log(Temp)

        console.log(response.main.humidity)
        console.log(response.wind.speed)

        
        
    })
});

