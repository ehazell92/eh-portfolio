import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Autocomplete, Checkbox, FormControlLabel, Radio, RadioGroup, Rating, Slider, Switch, ToggleButton, ToggleButtonGroup, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './form.css';
import { triggerSnackBar } from '../../../../../services/app-service';

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
    }, [formValues]);

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

        setErrors(newErrors);
        const objErrs = Object.keys(newErrors);
        if (isSubmit) {
            if (objErrs.length > 0) {
                const snackBarMsg = {
                    type: 'error',
                    msg: `Sorry, there appears to be some fields that have errors.`,
                };
                triggerSnackBar(snackBarMsg);
            } else {
                const snackBarMsg = {
                    type: 'success',
                    msg: `Congrats! You didn't have any form errors! This form will reset now.`,
                };
                triggerSnackBar(snackBarMsg);
                handleReset();
            }
        }
    }

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
    ];
    const [alignment, setAlignment] = useState('left');
    const handleAlignment = (event, newAlignment) => {
        const evTxt = event.target.innerText.toLowerCase();
        setAlignment(evTxt);
        updateFormValues('toggleButton', evTxt);
    };
    const rows = [
        { name: 'Frozen yoghurt', calories: 159, fat: 6.0 },
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0 },
    ];

    return (
        <Container maxWidth="sm">
            <form className='frm' onSubmit={handleSubmit}>
                <Grid className='main' container spacing={2}>
                    <Grid item xs={12}>
                        <span>Please make an Autocomplete selection.</span>
                        <Autocomplete
                            className={errors.autocomplete ? 'invalid' : ''}
                            onChange={(ev) => handleAutoCompleteChange(ev)}
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField name="autocomplete"  {...params} label="Autocomplete" />}
                        />
                        {
                            errors.autocomplete &&
                            <span
                                className='invalid'
                            >
                                Selection for Autocomplete is required.
                            </span>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <span>Please interact with the checkbox.</span>
                        <FormControlLabel control={
                            <Checkbox
                                checked={formValues.checkbox}
                                onClick={handleCheckboxChange}
                                name="checkbox"
                                className={errors.checkbox ? 'invalid' : ''}
                            />
                        } label="" />
                        {
                            errors.checkbox &&
                            <>
                                <br />
                                <span
                                    className='invalid'
                                >
                                    Interacting with the Checkbox is required.
                                </span>
                                <br />
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} >
                        <br />
                        <span>Please move the selection from Lost to Found</span>
                        <RadioGroup className={errors.radioGroup ? 'invalid' : ''} onChange={handleRadioGroupChange} row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel value="top" control={<Radio color="primary" />} label="Lost" />
                            <FormControlLabel value="start" control={<Radio color="primary" />} label="Found" />
                        </RadioGroup>
                        {
                            errors.radioGroup &&
                            <>
                                <span
                                    className='invalid'
                                >
                                    Moving the selection from Lost to Found is required.
                                </span>
                                <br />
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} >
                        <span>What would you rate the last meal you ate?</span>
                        <br />
                        <Rating
                            name="rating"
                            value={formValues.rating}
                            onClick={handleInputChange}
                            className={errors.rating ? 'invalid' : ''}
                        />
                        {
                            errors.rating &&
                            <>
                                <br />
                                <span
                                    className='invalid'
                                >
                                    Setting a rating on your last meal is required.
                                </span>
                                <br />
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} >
                        <br />
                        <span>This is just a basic slider.</span>
                        <Slider
                            onChange={(ev) => handleSliderChange(ev)}
                            aria-label="Default"
                            defaultValue={30}
                        />
                        {
                            errors.slider &&
                            <span
                                className='invalid'
                            >
                                Please move the slider at least once.
                            </span>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <br />
                        <span>Please interact with the switch</span>
                        <Switch
                            checked={formValues.switch}
                            onClick={handleToggleSwitchChange}
                            name="switch"
                            className={errors.switch ? 'invalid' : ''}
                        />
                        {
                            errors.switch &&
                            <>
                                <br />
                                <span className='invalid'>Interacting with the switch is required</span>
                                <br />
                            </>
                        }
                    </Grid>
                    <Grid item xs={12} >
                        <br />
                        <span>Where do you prefer your text alignment?</span>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onClick={(ev) => handleAlignment(ev)}
                            className={errors.toggleButton ? 'invalid' : ''}
                        >
                            <ToggleButton value="left">Left</ToggleButton>
                            <ToggleButton value="center">Center</ToggleButton>
                            <ToggleButton value="right">Right</ToggleButton>
                            <ToggleButton value="justify">Justify</ToggleButton>
                        </ToggleButtonGroup>
                        {
                            errors.toggleButton &&
                            <>
                                <br />
                                <span className='invalid'>Interacting with the text alignment is required.</span>
                                <br />
                            </>
                        }
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
                <Button className='btn' color="primary" variant="contained" fullWidth onClick={(event) => { event.preventDefault(); handleSubmit(event); }}>
                    Submit
                </Button>
                <Button className='btn2' color="secondary" variant="contained" fullWidth onClick={handleReset}>
                    Clear
                </Button>
            </form>
        </Container>
    );
};

export default Form;
