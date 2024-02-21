// https://api.weather.gov/points/40.6943,-73.9249
// https://api.weather.gov/points/{xords}

// https://api.weather.gov/gridpoints/{station}/{xords}/forecast
// https://api.weather.gov/gridpoints/TOP/32,81/forecast

const processWeatherRequest = async (city) => {
    return new Promise(async (resolve, reject) => {
        let weatherData = [];
        try {
            console.log('CITY');
            console.log(city);
            const latLong = `${city.long},${city.lat}`;
            console.log(`https://api.weather.gov/points/${latLong}`);
            const response = await fetch(`https://api.weather.gov/points/${latLong}`);
            const data = await response.json();
            console.log(data);
    
            const wthResponse = await fetch(`https://api.weather.gov/gridpoints/${data.properties.gridId}/${data.properties.gridX},${data.properties.gridY}/forecast`);
            const wData = await wthResponse.json();
            console.log(wData);
            console.log('~~~~~~');
            weatherData = {
                city: city.city,
                state: city.state,
                cityState: city.cityState,
                weather: wData.properties.periods
            };
    
            resolve(weatherData);
        } catch (error) {
            console.error(error);
            reject({ error: 'An error occurred' });
        }
    });
}

module.exports = { processWeatherRequest };