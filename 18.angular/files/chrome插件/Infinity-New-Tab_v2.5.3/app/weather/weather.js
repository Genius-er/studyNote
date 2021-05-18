"use strict";
$(document).ready(function() {
	var weather = JSON.parse(localStorage.weather);
		setWeather(weather,false);
	if ($setting.get('wcity') == '') {
		autoWeather();
	} else {
		getCityByCity();
	}
	setWeatherWeek();
});