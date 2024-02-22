
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { triggerSnackBar } from '../../../../../services/app-service';
import unitedstates from './assets/usCities.json';

import './weather.css';

const allStateCityLabels = Object.values(unitedstates.cities.reduce((acc, city) => {
    const key = `${city.city}, ${city.stateAb}`;
    if (!acc[key]) {
        acc[key] = city;
    }
    return acc;
}, {}))
    .sort((a, b) => a.stateAb.localeCompare(b.stateAb))
    .map(city => ({ ...city, cityState: `${city.city}, ${city.stateAb}` }));

const allStateLabels = allStateCityLabels.map(city => city.stateAb).filter((value, index, self) => self.indexOf(value) === index);
const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];
const tmpWeatherData = [
    {
        "number": 1,
        "name": "Tonight",
        "startTime": "2024-02-20T19:00:00-06:00",
        "endTime": "2024-02-21T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 37,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 2.7777777777777777
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 82
        },
        "windSpeed": "5 to 10 mph",
        "windDirection": "SW",
        "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 37. Southwest wind 5 to 10 mph."
    },
    {
        "number": 2,
        "name": "Wednesday",
        "startTime": "2024-02-21T06:00:00-06:00",
        "endTime": "2024-02-21T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 68,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 6.1111111111111107
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 87
        },
        "windSpeed": "5 to 10 mph",
        "windDirection": "E",
        "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
        "shortForecast": "Mostly Sunny",
        "detailedForecast": "Mostly sunny, with a high near 68. East wind 5 to 10 mph."
    },
    {
        "number": 3,
        "name": "Wednesday Night",
        "startTime": "2024-02-21T18:00:00-06:00",
        "endTime": "2024-02-22T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 42,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 6.666666666666667
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 83
        },
        "windSpeed": "5 to 15 mph",
        "windDirection": "NE",
        "icon": "https://api.weather.gov/icons/land/night/bkn?size=medium",
        "shortForecast": "Mostly Cloudy",
        "detailedForecast": "Mostly cloudy, with a low around 42. Northeast wind 5 to 15 mph, with gusts as high as 25 mph."
    },
    {
        "number": 4,
        "name": "Thursday",
        "startTime": "2024-02-22T06:00:00-06:00",
        "endTime": "2024-02-22T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 59,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 3.3333333333333335
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 79
        },
        "windSpeed": "15 mph",
        "windDirection": "N",
        "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
        "shortForecast": "Mostly Sunny",
        "detailedForecast": "Mostly sunny, with a high near 59. North wind around 15 mph, with gusts as high as 30 mph."
    },
    {
        "number": 5,
        "name": "Thursday Night",
        "startTime": "2024-02-22T18:00:00-06:00",
        "endTime": "2024-02-23T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 35,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 0.55555555555555558
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 83
        },
        "windSpeed": "10 to 15 mph",
        "windDirection": "NW",
        "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 35. Northwest wind 10 to 15 mph, with gusts as high as 20 mph."
    },
    {
        "number": 6,
        "name": "Friday",
        "startTime": "2024-02-23T06:00:00-06:00",
        "endTime": "2024-02-23T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 59,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 0
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 82
        },
        "windSpeed": "10 to 20 mph",
        "windDirection": "NW",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 59. Northwest wind 10 to 20 mph, with gusts as high as 30 mph."
    },
    {
        "number": 7,
        "name": "Friday Night",
        "startTime": "2024-02-23T18:00:00-06:00",
        "endTime": "2024-02-24T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 32,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": -1.1111111111111112
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 78
        },
        "windSpeed": "10 to 15 mph",
        "windDirection": "W",
        "icon": "https://api.weather.gov/icons/land/night/skc?size=medium",
        "shortForecast": "Clear",
        "detailedForecast": "Clear, with a low around 32. West wind 10 to 15 mph, with gusts as high as 20 mph."
    },
    {
        "number": 8,
        "name": "Saturday",
        "startTime": "2024-02-24T06:00:00-06:00",
        "endTime": "2024-02-24T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 64,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 0
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 78
        },
        "windSpeed": "10 to 15 mph",
        "windDirection": "SW",
        "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 64. Southwest wind 10 to 15 mph, with gusts as high as 25 mph."
    },
    {
        "number": 9,
        "name": "Saturday Night",
        "startTime": "2024-02-24T18:00:00-06:00",
        "endTime": "2024-02-25T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 38,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 0.55555555555555558
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 73
        },
        "windSpeed": "10 mph",
        "windDirection": "SW",
        "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 38. Southwest wind around 10 mph."
    },
    {
        "number": 10,
        "name": "Sunday",
        "startTime": "2024-02-25T06:00:00-06:00",
        "endTime": "2024-02-25T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 67,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 0.55555555555555558
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 73
        },
        "windSpeed": "10 to 15 mph",
        "windDirection": "NW",
        "icon": "https://api.weather.gov/icons/land/day/few?size=medium",
        "shortForecast": "Sunny",
        "detailedForecast": "Sunny, with a high near 67."
    },
    {
        "number": 11,
        "name": "Sunday Night",
        "startTime": "2024-02-25T18:00:00-06:00",
        "endTime": "2024-02-26T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 42,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 1.1111111111111112
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 70
        },
        "windSpeed": "5 to 15 mph",
        "windDirection": "SW",
        "icon": "https://api.weather.gov/icons/land/night/few?size=medium",
        "shortForecast": "Mostly Clear",
        "detailedForecast": "Mostly clear, with a low around 42."
    },
    {
        "number": 12,
        "name": "Monday",
        "startTime": "2024-02-26T06:00:00-06:00",
        "endTime": "2024-02-26T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 71,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 5
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 70
        },
        "windSpeed": "15 mph",
        "windDirection": "S",
        "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
        "shortForecast": "Mostly Sunny",
        "detailedForecast": "Mostly sunny, with a high near 71."
    },
    {
        "number": 13,
        "name": "Monday Night",
        "startTime": "2024-02-26T18:00:00-06:00",
        "endTime": "2024-02-27T06:00:00-06:00",
        "isDaytime": false,
        "temperature": 47,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 5.5555555555555554
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 68
        },
        "windSpeed": "15 mph",
        "windDirection": "SW",
        "icon": "https://api.weather.gov/icons/land/night/sct?size=medium",
        "shortForecast": "Partly Cloudy",
        "detailedForecast": "Partly cloudy, with a low around 47."
    },
    {
        "number": 14,
        "name": "Tuesday",
        "startTime": "2024-02-27T06:00:00-06:00",
        "endTime": "2024-02-27T18:00:00-06:00",
        "isDaytime": true,
        "temperature": 66,
        "temperatureUnit": "F",
        "temperatureTrend": null,
        "probabilityOfPrecipitation": {
            "unitCode": "wmoUnit:percent",
            "value": null
        },
        "dewpoint": {
            "unitCode": "wmoUnit:degC",
            "value": 3.3333333333333335
        },
        "relativeHumidity": {
            "unitCode": "wmoUnit:percent",
            "value": 66
        },
        "windSpeed": "15 to 20 mph",
        "windDirection": "W",
        "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
        "shortForecast": "Mostly Sunny",
        "detailedForecast": "Mostly sunny, with a high near 66."
    }
];

const Weather = () => {
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const [loctn, setLoctn] = React.useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [options, setOptions] = useState([]);
    const [state, setState] = React.useState('');

    function getTimeZoneOffset(timeZone) {
        const now = new Date();
        const timeZoneOffset = Intl.DateTimeFormat(undefined, { timeZone }).resolvedOptions().timeZone;
        const offsetInMinutes = now.getTimezoneOffset();
        return offsetInMinutes;
    }
    const getDayOfWeek = (dtString) => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const userTimeZoneOffst = getTimeZoneOffset(userTimeZone);
        const date = new Date(`${dtString}T00:00:00${userTimeZoneOffst > 0 ? '-' : '+'}${Math.abs(userTimeZoneOffst / 60).toString().padStart(2, '0')}:${(Math.abs(userTimeZoneOffst) % 60).toString().padStart(2, '0')}`);
        const dayIndex = date.getUTCDay();
        return daysOfWeek[dayIndex];
    };
    const unpackWeather = (weather) => {
        const newWeather = [];
        let curDay = null;
        weather.forEach((wthr) => {
            let newDay;
            if (wthr) {
                let theDay = wthr.startTime.split('T');
                const theTime = theDay[1].split('-')[0].split(':')[0];
                theDay = theDay[0];
                const isDay = theTime === '06';
                const dayNight = isDay ? 'day' : 'night';

                if (theDay !== curDay) {
                    curDay = theDay;
                    newWeather.push({
                        night: null,
                        day: null,
                    })
                }
                newWeather[newWeather.length - 1][dayNight] = {
                    ...wthr,
                    dayOfWeek: getDayOfWeek(theDay)
                };
            }
        });
        return newWeather;
    }

    const getCityWeather = async (city) => {
        const foundCity = allStateCityLabels.find((c) => c.cityState === city) || null;
        const loctnExists = foundCity ? loctn.some((l) => l.state === foundCity.state && l.city === foundCity.city) || null : null;
        let curLocs;
        if (foundCity) {
            if (!loctnExists) {
                const newLoctns = [
                    ...loctn,
                    {
                        ...foundCity,
                        fCastLength: 7,
                        weather: []
                    }
                ];
                curLocs = newLoctns;
                setLoctn(newLoctns);
            }
            try {
                const isLocal = process.env.NODE_ENV !== 'production';
                let recvdWeather = null;
                if (!isLocal) {
                    const res = await fetch('/api/getWeather', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ city: foundCity })
                    });
                    recvdWeather = await res.json();
                } else {
                    recvdWeather = { city: 'all', weather: tmpWeatherData };
                }

                if (recvdWeather) {
                    const wthrLocsUpdte = unpackWeather(recvdWeather.weather);
                    const updtdLocs = curLocs.map((loc) => {
                        if (
                            isLocal ||
                            (
                                loc.city === recvdWeather.city &&
                                loc.state === recvdWeather.state
                            )
                        ) {
                            return {
                                ...loc,
                                weather: wthrLocsUpdte,
                                noWeatherFound: wthrLocsUpdte.length === 0
                            };
                        }
                        return loc;
                    });
                    setLoctn(updtdLocs);
                }
            } catch (error) {
                triggerSnackBar({
                    message: `Seems like we had some troubles finding the weather for ${foundCity.cityState}`,
                    type: 'error'
                });
            }
        }
    };

    const handleForecastLength = (event, locName) => {
        const newLoc = loctn.map((loc) => {
            const fCast = loc.cityState === locName ? Number(event.target.value) : loc.fCastLength;
            return {
                ...loc,
                fCastLength: fCast
            };
        });
        setLoctn(newLoc);
    };
    const getLocLengthVal = (locLength) => {
        return `${locLength}` || "7";
    }

    const handleStateChange = (event) => {
        const theState = event.target.value;
        const filteredCities = allStateCityLabels
            .filter(city => city.stateAb === theState)
            .map(city => `${city.city}, ${city.stateAb}`)
            .sort((a, b) => a.localeCompare(b));
        setOptions(filteredCities);
        setState(theState);
    }
    const handleCitySelect = (event, value) => {
        // When the user clears
        if (event.type === 'click' && (value && !value.length)) {
            setSelectedCities([]);
            setLoctn([]);
            const filteredCities = allStateCityLabels
                .filter(city => city.stateAb === state)
                .map(city => `${city.city}, ${city.stateAb}`)
                .sort((a, b) => a.localeCompare(b));
            setOptions(filteredCities);
            return;
        }
        if (value) {
            const selectedCity = value[value.length - 1];
            if (Array.isArray(value)) {
                const distArr = [...selectedCities, ...value].filter((value, index, self) => self.indexOf(value) === index);
                setSelectedCities(distArr);
                const filteredOpts = options.filter(
                    (city) => !(value.some(
                        (vl) => vl === city)
                    )).sort((a, b) => a.localeCompare(b));
                setOptions(filteredOpts);
            } else {
                const distArr = [...selectedCities, value].filter((value, index, self) => self.indexOf(value) === index);
                setSelectedCities(distArr);
                setOptions(
                    options.filter(
                        (city) => city !== value
                    ).sort(
                        (a, b) => a.localeCompare(b)
                    )
                );
            }
            getCityWeather(selectedCity);
        }
    };

    const handleDelete = (cityToDelete) => {
        setSelectedCities(selectedCities.filter((city) => city !== cityToDelete));
        const toDelete = [...options, cityToDelete].sort(
            (a, b) => a.localeCompare(b)
        );
        setOptions(toDelete);
        setLoctn(
            loctn.filter((loc) => loc.cityState !== cityToDelete)
        );
    };


    return (
        <div className='wth-parent'>
            <div className='wth-child'>
                <div className='weather-location'>
                    <div>
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="state-select">Select State</InputLabel>
                                <Select
                                    labelId="state-select-label"
                                    id="state-select"
                                    value={state}
                                    label="Select State"
                                    onChange={handleStateChange}
                                >
                                    {
                                        allStateLabels.map((state) => (
                                            <MenuItem key={`${state}-ky`} value={state}>{state}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        {
                            state && state.length > 0 &&
                            <div>
                                <div>
                                    {selectedCities.map((city, index) => (
                                        <Chip
                                            key={`${city}-${index}`}
                                            label={city}
                                            onDelete={() => handleDelete(city)}
                                            style={{ margin: '4px' }}
                                        />
                                    ))}
                                </div>
                                <div>
                                    <Autocomplete
                                        multiple
                                        id="city-input"
                                        className='cities-autocomplete '
                                        options={options}
                                        value={selectedCities}
                                        onChange={handleCitySelect}
                                        getOptionLabel={(option) => option}
                                        disableCloseOnSelect
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Available Cities"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {
                    loctn.length > 0 &&
                    (
                        loctn.map((loc) => (
                            <div className='weather-rpt'>
                                <div>
                                    <h2>{loc.cityState}</h2>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={getLocLengthVal(loc.fCastLength)}
                                        exclusive
                                        onChange={(ev) => handleForecastLength(ev, loc.cityState)}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="3">3</ToggleButton>
                                        <ToggleButton value="5">5</ToggleButton>
                                        <ToggleButton value="7">7</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                <div className='weather-forecast'>
                                    {loc.weather?.length > 0 &&
                                        Array.from({ length: loc.fCastLength }).map((_, index) => (
                                            <>
                                                {
                                                    loc.weather[index]?.day &&
                                                    <>
                                                        <div>
                                                            <h3>{loc.weather[index].day.dayOfWeek}</h3>
                                                            <div>Day: {loc.weather[index].day.shortForecast}</div>
                                                        </div>
                                                    </>
                                                }
                                                {
                                                    loc.weather[index]?.night &&
                                                    !loc.weather[index]?.day &&
                                                    <>
                                                        <div>
                                                            <h3>{loc.weather[index].night.dayOfWeek}</h3>
                                                            <div>Night: {loc.weather[index].night.shortForecast}</div>
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        ))
                                    }
                                    {
                                        (
                                            loc.weather.length === 0 &&
                                            !loc.noWeatherFound
                                        ) &&
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
                                    }
                                    {
                                        (
                                            loc.weather.length === 0 &&
                                            loc.noWeatherFound
                                        ) &&
                                        <h2>Sorry, couldn't find weather for {loc.cityState}</h2>
                                    }
                                </div>
                            </div>
                        ))
                    )
                }
                {
                    loctn.length <= 0 &&
                    <>
                        <h1>Select a weather location to begin...</h1>
                    </>
                }
            </div>
        </div>
    );
};

export default Weather;