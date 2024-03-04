

const city = '49.5464';
const countryCode = '5.8408';

const weatherAPIEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${city}&longitude=${countryCode}&current=temperature_2m,is_day,rain,showers,snowfall,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,showers,snowfall,weather_code,cloud_cover,visibility,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin`;

function getWeather() {
    $.ajax({
        url: weatherAPIEndpoint,
        method: 'GET',
        success: function (data) {
            const time = data.hourly.time;
            const temperature = data.hourly.temperature_2m;
            const rain = data.hourly.rain;
            const snowfall = data.hourly.snowfall;

            const temp_dictionary = {};
            const rain_dictionary = {};
            const snowfall_dictionary = {};

            for (let i = 0; i < time.length; i++) {
                temp_dictionary[time[i]] = temperature[i];
                rain_dictionary[time[i]] = rain[i];
                snowfall_dictionary[time[i]] = snowfall[i];

              }

            const currentTime = new Date();

            const year = currentTime.getFullYear();
            const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
            const day = String(currentTime.getDate()).padStart(2, '0');
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const formattedTime = `${year}-${month}-${day}T${hours}:00`;

            const weatherInfo = `${hours}h. Temperature: ${temp_dictionary[formattedTime]}°C. Rain: ${rain_dictionary[formattedTime]}mm. Snowfall: ${snowfall_dictionary[formattedTime]}cm.`;



            const days = data.daily.time;
            const temperatures = data.daily.temperature_2m_max;
            const weekdayList = days.map(dateString => getDayOfWeek(dateString));
            const concatenatedList = days.map((element, index) => element + ' ' + weekdayList[index]);

            const sum = temperatures.reduce((acc, num) => acc + num, 0);

            const average = sum / temperatures.length;

            var color = '';

            if(average >= 15){
                color = 'rgba(204, 102, 0, 0.65)';
            }else if(average >=30){
                color = 'rgba(204, 0, 0, 0.65)';
            }else{
                color = 'rgba(0, 0, 153, 0.65)';
            }
                                        
            const canvas = document.getElementById("temperatureBarChart");
            const ctx = canvas.getContext("2d");

            const temperatureBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: concatenatedList,
                datasets: [{
                label: 'Temperature',
                data: temperatures,
                backgroundColor: color, 
                borderWidth: 1, 
                }]
            },
            options: {
                scales: {
                y: {
                    beginAtZero: true
                }
                }
            }
            });
            $('#weather-info').text(weatherInfo);
        },
        error: function (error) {
            console.error('Error fetching weather data:', error);
            $('#weather-info').text('Error fetching weather data');
        }
    });
}

function getDayOfWeek(dateString) {
    const date = new Date(dateString);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayOfWeekIndex = date.getDay();

    return weekdays[dayOfWeekIndex];
}

$(document).ready(function () {
    getWeather();
});






//  https://api.open-meteo.com/v1/forecast?latitude=49.5464&longitude=5.8408&hourly=temperature_2m,rain,showers,snowfall

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,rain,showers,snowfall,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,rain,showers,snowfall,weather_code,cloud_cover,visibility,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Europe%2FBerlin