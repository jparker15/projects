# Weather API Project - Due 5/4/20

**Version 1.0.0**

 A webpage that allows a client to get current weather information by searching a zip-code or city name.  
    User inputs a zip code or city name via OpenWeather weather info for that location would be displayed


 Another portion of the page will be dedicated to a historical weather search. 
    User selects a date (year/month/day) and inputs a city name. The city name input is used to searched for a nearby station via Meteostat api calland if there's more then one station user must select their option. The date and station inputs are used by a second Meteostat api call to give the user the weather info based on date and station location. 

1. setup initital htmls elements i.e. divs, buttons, select, input, headers

2. access openweather api for weather info by city name or zip of the current day; set button to this function
   append request info to DOM

3. access meteostat api for historic weather by city name(nearest station); set button to this function
   user must input a valid city name before a date can be selected
   set select element to allow user to input a date
   append request info to DOM


## License & Copyright

OpenWeather API
© 2012 — 2020 OpenWeather ® All rights reserved. 

Meteostat API
Copyright © meteostat