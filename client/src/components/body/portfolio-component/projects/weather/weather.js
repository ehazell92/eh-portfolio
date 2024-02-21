
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

const Weather = () => {
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const [loctn, setLoctn] = React.useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [options, setOptions] = useState([]);
    const [state, setState] = React.useState('');

    const getCityWeather = async (city) => {
        const foundCity = allStateCityLabels.find((c) => c.cityState === city) || null;
        const loctnExists = foundCity ? loctn.some((l) => l.state === foundCity.state && l.city === foundCity.city) || null : null;
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
                setLoctn(newLoctns);
            }
            try {
                const res = await fetch('/getWeather', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ city: foundCity })
                });
                const recvdWeather = await res.json();
                console.log(recvdWeather);
                console.log('');
            } catch (error) {   
                triggerSnackBar({
                    message: `An error occurred while fetching weather data for ${foundCity.cityState}`,
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
        const toDelete =[...options, cityToDelete].sort(
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
                                    {   loc.weather?.length > 0 &&
                                        Array.from({ length: loc.fCastLength }).map((_, index) => (
                                            <div>[ Weather Box ]</div>
                                        ))
                                    }
                                    {
                                        loc.weather.length === 0 &&
                                        <Box sx={{ display: 'flex' }}>
                                            <CircularProgress />
                                        </Box>
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