
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
import { triggerSnackBar } from '../../../../../services/app-service';

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
    const [zipCodes, setZipCodes] = useState([]);
    const [currentZip, setCurrentZip] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const [locationName, setlocationName] = React.useState([]);
    const [loctn, setLoctn] = React.useState([]);

    const changeLocations = (event) => {
        console.log(locationName);
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
    const handleZipPress = (event) => {
        if (event.key === 'Enter' || event.type === 'blur') {
            const newZip = event.target.value.trim();
            if (newZip !== '' && newZip.length === 5) {
                setZipCodes([...zipCodes, newZip]);
            }
            setCurrentZip('');
        }
    };

    const handleZipDelete = (zipToDelete) => {
        setZipCodes(zipCodes.filter((zip) => zip !== zipToDelete));
    };


    return (
        <div className='wth-parent'>
            <div className='wth-child'>
                <div className='weather-location'>
                    <div>
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
                    </div>
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