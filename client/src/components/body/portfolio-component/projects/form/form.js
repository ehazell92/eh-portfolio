import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Autocomplete, Checkbox, FormControlLabel, Radio, RadioGroup, Rating, Slider, Switch, ToggleButton, ToggleButtonGroup, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './form.css';

let submitTouched = false;

const Form = () => {
    const [formValues, setFormValues] = useState({
        autocomplete: '',
        checkbox: null,
        radioGroup: '',
        rating: null,
        slider: null,
        switch: null,
        toggleButton: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const starVal = Number(event.target.innerText.split(' ')[0]);
        updateFormValues('rating', starVal);
    };

    const handleRadioGroupChange = (event) => {
        updateFormValues('radioGroup', event.target.value);
    };

    const handleAutoCompleteChange = (event) => {
        updateFormValues('autocomplete', event.target.innerText);
    };

    const handleCheckboxChange = (event) => {
        const newVal = formValues.checkbox && event.target.checked ? false : event.target.checked;
        updateFormValues('checkbox', newVal);
    };

    const handleToggleSwitchChange = (event) => {
        const newVal = formValues.switch && event.target.checked ? false : event.target.checked;
        updateFormValues('switch', newVal);
    };

    const handleSliderChange = (event, newValue) => {
        updateFormValues('slider', newValue);
    };

    const updateFormValues = (frmName, val) => {
        setFormValues({
            ...formValues,
            [frmName]: val
        });
    };

    useEffect(() => {
        if (submitTouched) {
            checkFormErrors();
        }
    },  [formValues]);

    const handleReset = () => {
        submitTouched = false;
        setFormValues({
            autocomplete: '',
            checkbox: null,
            radioGroup: '',
            rating: null,
            slider: null,
            switch: null,
            toggleButton: '',
        });
    };

    const handleSubmit = (event) => {
        submitTouched = true;
        event.preventDefault();
        checkFormErrors(true);
    };

    const checkFormErrors = (isSubmit = false) => {
        const newErrors = {};
        if (formValues.autocomplete === '' || formValues.autocomplete === null) newErrors.autocomplete = 'Autocomplete is required';
        if (formValues.checkbox === '' || formValues.checkbox === null) newErrors.checkbox = 'Checkbox must be checked';
        if (formValues.radioGroup === '' || formValues.radioGroup === null) newErrors.radioGroup = 'A radio option is required';
        if (formValues.rating === '' || formValues.rating === null) newErrors.rating = 'Rating is required';
        if (formValues.slider === '' || formValues.slider === null) newErrors.slider = 'Slider value is required';
        if (formValues.switch === '' || formValues.switch === null) newErrors.switch = 'Switch must be checked';
        if (formValues.toggleButton === '' || formValues.toggleButton === null) newErrors.toggleButton = 'A toggle button option is required';

        const objErrs = Object.keys(newErrors);
        if (objErrs.length > 0) {
            setErrors(newErrors);
            if (isSubmit) {
                objErrs.forEach((e) => {
                    console.log(`Error Encountered -${e}- :: ${newErrors[e]}`);
                });
                console.log('');
            }
        } else {
            if (isSubmit) {
                console.log('NO Errors! ');
                console.log(formValues);
                console.log('');
            }
        }
    }

    // Variable definitions go here
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        // Add more films here
    ];
    const [value, setValue] = useState(2);
    const [alignment, setAlignment] = useState('left');
    const handleAlignment = (event, newAlignment) => {
        const evTxt = event.target.innerText.toLowerCase();
        setAlignment(evTxt);
        updateFormValues('toggleButton', evTxt);
    };
    const rows = [
        { name: 'Frozen yoghurt', calories: 159, fat: 6.0 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0 },
        // Add more rows here
    ];

    return (
        <Container maxWidth="sm">
            <form style={{
                backgroundColor: 'white',
                color: 'black',
            }} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            className={errors.autocomplete ? 'invalid' : ''}
                            onChange={handleAutoCompleteChange}
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField name="autocomplete"  {...params} label="Autocomplete" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel control={<Checkbox
                            checked={formValues.checkbox}
                            onClick={handleCheckboxChange}
                            name="checkbox"
                            className={errors.checkbox ? 'invalid' : ''}
                        />} label="Checkbox" />
                        <RadioGroup className={errors.radioGroup ? 'invalid' : ''} onChange={handleRadioGroupChange} row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel value="top" control={<Radio color="primary" />} label="Radio 1" />
                            <FormControlLabel value="start" control={<Radio color="primary" />} label="Radio 2" />
                        </RadioGroup>
                        <Rating
                            name="rating"
                            value={formValues.rating}
                            onClick={handleInputChange}
                            className={errors.rating ? 'invalid' : ''}
                        />
                        <Slider onChange={handleSliderChange} aria-label="Default" defaultValue={30} />
                        <Switch
                            checked={formValues.switch}
                            onClick={handleToggleSwitchChange}
                            name="switch"
                            className={errors.switch ? 'invalid' : ''}
                        />
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onClick={handleAlignment}
                            className={errors.toggleButton ? 'invalid' : ''}
                        >
                            <ToggleButton value="left">Left</ToggleButton>
                            <ToggleButton value="center">Center</ToggleButton>
                            <ToggleButton value="right">Right</ToggleButton>
                            <ToggleButton value="justify">Justify</ToggleButton>
                        </ToggleButtonGroup>
                        <Chip label="Basic" />
                        <Chip label="Intermediate" />
                        <Chip label="Advanced" />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dessert (100g serving)</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Fat (g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" fullWidth onClick={(event) => { event.preventDefault(); handleSubmit(event); }}>
                    Submit
                </Button>
                <Button color="secondary" variant="contained" fullWidth onClick={handleReset}>
                    Clear
                </Button>
            </form>
        </Container>
    );
};

export default Form;
