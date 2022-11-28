//We need to store the value of the input\\
// The function could look like this. 
let town =$("#searchWord").val();
// Next we will need to store the api key
const apiKey = "9dd247337ad4b6b047a2f9a30dacaf93"

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
    const queryUrl= "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(response){

        console.log(response)

        console.log(response.name)
        console.log(response.weather[0].icon)

    })
});
