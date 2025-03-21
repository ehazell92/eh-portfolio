
const hasInitialData = (dt) => {
    return (
        dt && 
        dt.properties && 
        (
            dt.properties.gridId &&
            dt.properties.gridX &&
            dt.properties.gridY
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
                wData = wData.properties ? wData.properties.periods || [] : [];
            }
            weatherData = {
                city: city.city,
                state: city.state,
                cityState: city.cityState,
                weather: wData
            };
            resolve(weatherData);
        } catch (error) {
            console.error(error);
            reject({ error: 'An error occurred' });
        }
    });
}

const processWeatherLocationRequest = async (lat, long) => {
    return new Promise(async (resolve, reject) => {
        let weatherData = [];
        try {
            const latLong = `${lat},${long}`;
            console.log('the fetch: ', `https://api.weather.gov/points/${latLong}`);
            const response = await fetch(`https://api.weather.gov/points/${latLong}`);
            const data = await response.json() || null;
    
            let wData;
            if (hasInitialData(data)) {
                const wthResponse = await fetch(`https://api.weather.gov/gridpoints/${data.properties.gridId}/${data.properties.gridX},${data.properties.gridY}/forecast`);
                wData = await wthResponse.json();
                wData = wData.properties ? wData.properties.periods || [] : [];
                const locProps = data.properties.relativeLocation.properties || null;
                const city = locProps ? locProps.city : null;
                const state = locProps ? locProps.state : null;
                const cityState = `${city}, ${state}`;
                weatherData = {
                    city: city,
                    state: state,
                    cityState: cityState,
                    weather: wData
                };
                resolve(weatherData);
            } else {
                reject({ error: 'An error occurred fetching city'});
            }
        } catch (error) {
            console.error(error);
            reject({ error: 'An error occurred' });
        }
    });
}

module.exports = { 
    processWeatherRequest,
    processWeatherLocationRequest
};