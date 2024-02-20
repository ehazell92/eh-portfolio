
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
import { triggerSnackBar } from '../../../../../services/app-service';
import unitedstates from './assets/usCities.json';

import './weather.css';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const locations = [
    {
        name: 'Seattle, WA',
        stat: 'SEW',
        latlong: '124,68'
    },
    {
        name: 'San Fransisco, CA',
        stat: 'MTR',
        latlong: '86,106'
    },
    {
        name: 'New York, NY',
        stat: 'OKX',
        latlong: '33,35'
    }
];
const allCityLabels = Object.values(unitedstates.cities.reduce((acc, city) => {
    const key = `${city.city}, ${city.stateAb}`;
    if (!acc[key]) {
        acc[key] = city;
    }
    return acc;
}, {}))
    .sort((a, b) => a.stateAb.localeCompare(b.stateAb))
    .map(city => `${city.city}, ${city.stateAb}`);

const localCityLabels = Object.values(unitedstates.cities.reduce((acc, city) => {
    const key = `${city.city}, ${city.stateAb}`;
    if (!acc[key]) {
        acc[key] = city;
    }
    return acc;
}, {}))
    .filter(city => city.stateAb === 'WA')
    .sort((a, b) => a.stateAb.localeCompare(b.stateAb))
    .map(city => `${city.city}, ${city.stateAb}`);

const getStyles = (name, personName, theme) => {
    const isSelected = personName.indexOf(name) === -1;
    return {
        backgroundColor: !isSelected ? 'rgba(0,0,0,0.2)' : '',
        color: !isSelected ? 'white' : '',
        textShadow: !isSelected ? '1px 1px 2px rgba(0,0,0,1)' : '',
        fontWeight:
            isSelected
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightBold,
    };
}

const Weather = () => {
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const [locationName, setlocationName] = React.useState([]);
    const [loctn, setLoctn] = React.useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [options, setOptions] = useState(localCityLabels);

    const changeLocations = (event) => {
        const {
            target: { value },
        } = event;
        setlocationName(
            typeof value === 'string' ? value.split(',') : value,
        );
        const selVals = typeof value === 'string' ? value.split(',') : value;
        const builtVals = [];
        selVals.forEach((loc) => {
            const foundLoc = locations.find((l) => l.name === loc) || null;
            if (foundLoc) {
                builtVals.push({
                    ...foundLoc,
                    fCastLength: 7
                });
            }
        });
        setLoctn(builtVals);
    };
    const handleForecastLength = (event, locName) => {
        const newLoc = loctn.map((loc) => {
            const fCast = loc.name === locName ? Number(event.target.value) : loc.fCastLength;
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


    const handleCitySelect = (event, value) => {
        if (value) {
            if (Array.isArray(value)) {
                const distArr = [...selectedColors, ...value].filter((value, index, self) => self.indexOf(value) === index);
                setSelectedColors(distArr);
                const filteredOpts = options.filter(
                    (city) => !(value.some(
                        (vl) => vl === city)
                    ))
                setOptions(filteredOpts);
            } else {
                const distArr = [...selectedColors, value].filter((value, index, self) => self.indexOf(value) === index);
                setSelectedColors(distArr);
                setOptions(options.filter((city) => city !== value));
            }
        }
    };

    const handleDelete = (cityToDelete) => {
        setSelectedColors(selectedColors.filter((city) => city !== cityToDelete));
        setOptions([...options, cityToDelete]);
    };


    return (
        <div className='wth-parent'>
            <div className='wth-child'>
                <div className='weather-location'>
                    <div>
                        <div>
                            {selectedColors.map((city, index) => (
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
                                value={selectedColors}
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
                    {/* <div>
                        <div>
                            {zipCodes.map((zip, index) => (
                                <Chip
                                    key={index}
                                    label={zip}
                                    onDelete={() => handleZipDelete(zip)}
                                    style={{ margin: '4px' }}
                                />
                            ))}
                        </div>
                        <TextField
                            label="Enter ZIP code"
                            value={currentZip}
                            onChange={(e) => setCurrentZip(e.target.value)}
                            onKeyDown={handleZipPress}
                            onBlur={handleZipPress}
                        />
                    </div> */}
                    <FormControl sx={{
                        m: 1,
                        width: 300,
                        borderRadius: '10px',
                    }}>
                        <InputLabel id="location">
                            Locations
                        </InputLabel>
                        <Select
                            labelId="location-select"
                            id="location-select"
                            multiple
                            value={locationName}
                            onChange={changeLocations}
                            input={<OutlinedInput id="select-multiple" label="locations" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {locations.map((loc) => (
                                <MenuItem
                                    key={loc.name}
                                    value={loc.name}
                                    style={getStyles(loc.name, locationName, theme)}
                                >
                                    {loc.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {
                    loctn.length > 0 &&
                    (
                        loctn.map((loc) => (
                            <div className='weather-rpt'>
                                <div>
                                    <h2>{loc.name}</h2>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={getLocLengthVal(loc.fCastLength)}
                                        exclusive
                                        onChange={(ev) => handleForecastLength(ev, loc.name)}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="3">3</ToggleButton>
                                        <ToggleButton value="5">5</ToggleButton>
                                        <ToggleButton value="7">7</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                <div className='weather-forecast'>
                                    {
                                        Array.from({ length: loc.fCastLength }).map((_, index) => (
                                            <div>[ Weather Box ]</div>
                                        ))
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