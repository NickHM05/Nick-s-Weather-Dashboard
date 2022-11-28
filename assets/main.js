//We need to store the value of the input\\
// The function could look like this. 
let city =$("#searchWord").val();
// Next we will need to store the api key
const apiKey ="9dd247337ad4b6b047a2f9a30dacaf93"

let date = new Date();

$("SearchTerm").keypress(function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        $("#searchBtn").click('show');
    }
});

$("#searchBtn").on("click",function(){

    $('#forecastH5').addClass('show');

    // will take the value from the user as input
    city =$("#SearchTerm").val("");

    //how to clear the input box
    $("#SearchTerm").val("");

    //the url to call the api is used here
    const queryUrl= "api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;
    //var queryUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=apiKey&units=imperial";

    $.ajax({
        url:queryUrl,
        method: "GET"
    })
    .then(function(response){

        console.log(response)

        console.log(response.name)
        console.log(response.weather[0].icon)

    })
});
