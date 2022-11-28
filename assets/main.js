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
})
