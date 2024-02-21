// https://api.weather.gov/points/40.6943,-73.9249
// https://api.weather.gov/points/{xords}

// https://api.weather.gov/gridpoints/{station}/{xords}/forecast
// https://api.weather.gov/gridpoints/TOP/32,81/forecast

const hasInitialData = (dt) => {
    return (
        data && 
        data.properties && 
        (
            data.properties.gridId &&
            data.properties.gridX &&
            data.properties.gridY
        )
    )
};

const processWeatherRequest = async (city) => {
    return new Promise(async (resolve, reject) => {
        let weatherData = [];
        try {
            const latLong = `${city.long},${city.lat}`;
            const response = await fetch(`https://api.weather.gov/points/${latLong}`);
            const data = await response.json() || null;
    
            let wData;
            if (hasInitialData(data)) {
                const wthResponse = await fetch(`https://api.weather.gov/gridpoints/${data.properties.gridId}/${data.properties.gridX},${data.properties.gridY}/forecast`);
                wData = await wthResponse.json();
            }
            weatherData = {
                city: city.city,
                state: city.state,
                cityState: city.cityState,
                weather: wData.properties.periods || []
            };
    
            console.log(weatherData);
            console.log('~~~~~~');
            resolve(weatherData);
        } catch (error) {
            console.error(error);
            reject({ error: 'An error occurred' });
        }
    });
}

module.exports = { processWeatherRequest };