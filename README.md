# Nick-s-Weather-Dashboard
RESOURCES USED:https://cdnjs.cloudflare.com/
https://getbootstrap.com/docs/5.2/getting-started/contents/
https://fontawesome.com/kits
https://www.w3schools.com/xml/ajax_intro.asp  




Use the [5 Day Weather Forecast](https://openweathermap.org/forecast5) to retrieve weather data for cities. The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`. After registering for a new API key, you may need to wait up to 2 hours for that API key to activate.

**Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
Done GIVEN a weather dashboard with form inputs
Done WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
Done WHEN I view current weather conditions for that city
Done THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
Done WHEN I view future weather conditions for that city
Done THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```