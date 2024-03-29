import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Autocomplete, Checkbox, FormControlLabel, Radio, RadioGroup, Rating, Slider, Switch, ToggleButton, ToggleButtonGroup, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './form.css';
import { triggerSnackBar } from '../../../../../services/app-service';

let submitTouched = false;

const tierModel = {
    type: 'tier',
    frmCntrl: 'fifthQuest',
    question: 'Please make a selection for tier one',
    options: ['1', '2', '3', '4'],
    required: true,
    isVisible: false,
};
const formQuestions = [
    {
        type: 'tggle',
        frmCntrl: 'firstQuest',
        question: 'Would you like to see the second question?',
        options: ['Yes', 'No'],
        required: true,
        isVisible: true,
        class: 'fc',
        hasError: false,
        value: null,
    },
    {
        type: 'tggle',
        frmCntrl: 'secondQuest',
        question: 'Would you like to see the third question?',
        options: ['Yes', 'No'],
        required: true,
        isVisible: false,
        class: 'fc',
        hasError: false,
        value: null,
    },
    {
        type: 'input',
        frmCntrl: 'thirdQuest',
        question: "Please type 'Yes' to see question four.",
        required: true,
        isVisible: false,
        class: 'fc',
        hasError: false,
        value: null,
    },
    {
        type: 'ddl',
        frmCntrl: 'fourthQuest',
        question: 'Please select how many tiers you would like',
        options: ['1', '2', '3', '4'],
        required: true,
        isVisible: false,
        class: 'fc',
        hasError: false,
        value: null,
    },
    {
        type: 'tier',
        frmCntrl: 'fifthQuest',
        question: 'Please make your tier selections',
        options: [],
        required: true,
        isVisible: false,
        class: 'fc',
        hasError: false,
        value: null,
    },
    {
        type: 'cb',
        frmCntrl: 'sixthQuest',
        question: 'I would recommend this survey style to a friend',
        options: [''],
        required: false,
        isVisible: false,
        class: 'fc',
        hasError: false,
        value: null,
    },
    {
        type: 'text',
        frmCntrl: 'seventhQuest',
        question: 'Please explain what you liked about this survey.',
        required: true,
        isVisible: false,
        class: 'fc',
        hasError: false,
        value: null,
    },
];

const DynaForm = () => {
    const [formValues, setFormValues] = useState(formQuestions);

    const [formErrors, setFormErrors] = useState({});

    const handleFormControlChange = (event, cntrlName) => {
        const cntrlVal = event.target.value || event.target.innerText;
        const newFormVals = formValues.map(
            (frmCntrl) => {
                if (frmCntrl.frmCntrl === cntrlName) {
                    return {
                        ...frmCntrl,
                        value: cntrlVal
                    }; 
                } else {
                    return frmCntrl;
                }
            }
        );
        updateFormControlValues(newFormVals);
    };
    const updateFormControlValues = (frmObj) => {
        setFormValues({
            frmObj
        });
        checkFormErrors();
    };
    const checkFormErrors = (ret = false) => {
        formValues.forEach((frmCntrl) => {
            const frmVal = frmCntrl.value || null;
            if (!frmVal || frmVal.length === 0) {
                frmCntrl.hasError = true;
            }
        });

        const currentErrors = formValues.filter(
            (frmCntrl) => frmCntrl.hasError
        ) || [];        
        setFormErrors(currentErrors);
    };

    const handleSubmission = () => {
        const currentErrors = formValues.filter((frmCntrl) => frmCntrl.hasError) || [];
        if (currentErrors.length) {
            const snackBarMsg = {
                type: 'error',
                msg: 'Submission Failed: The Form is Invalid'
            };
            triggerSnackBar(snackBarMsg);
        } else {
            const snackBarMsg = {
                type: 'success',
                msg: 'Successsss'
            };
            triggerSnackBar(snackBarMsg);
        }
    };

    const getValue = (cntrlName) => {
        const foundVal = formValues.find(
            (frmCntrl) => frmCntrl.frmCntrl === cntrlName
        ) || null;
        return foundVal;
    };

    useEffect(() => {
        if (submitTouched) {
            // checkFormErrors();
        }
    }, [formValues]);

    // const handleReset = () => {
    //     submitTouched = false;
    //     setFormValues({
    //         autocomplete: '',
    //         checkbox: null,
    //         radioGroup: '',
    //         rating: null,
    //         slider: null,
    //         switch: null,
    //         toggleButton: '',
    //     });
    // };

    // const handleSubmit = (event) => {
    //     submitTouched = true;
    //     event.preventDefault();
    //     checkFormErrors(true);
    // };

    // const checkFormErrors = (isSubmit = false) => {
    //     const newErrors = {};
    //     if (formValues.autocomplete === '' || formValues.autocomplete === null) newErrors.autocomplete = 'Autocomplete is required';
    //     if (formValues.checkbox === '' || formValues.checkbox === null) newErrors.checkbox = 'Checkbox must be checked';
    //     if (formValues.radioGroup === '' || formValues.radioGroup === null) newErrors.radioGroup = 'A radio option is required';
    //     if (formValues.rating === '' || formValues.rating === null) newErrors.rating = 'Rating is required';
    //     if (formValues.slider === '' || formValues.slider === null) newErrors.slider = 'Slider value is required';
    //     if (formValues.switch === '' || formValues.switch === null) newErrors.switch = 'Switch must be checked';
    //     if (formValues.toggleButton === '' || formValues.toggleButton === null) newErrors.toggleButton = 'A toggle button option is required';

    //     setErrors(newErrors);
    //     const objErrs = Object.keys(newErrors);
    //     if (objErrs.length > 0) {
    //         if (isSubmit) {
    //             const snackBarMsg = {
    //                 type: 'error',
    //                 msg: `Sorry, there appears to be some fields that have errors.`,
    //               };
    //             triggerSnackBar(snackBarMsg);
    //         }
    //     } else {
    //         if (isSubmit) {
    //             const snackBarMsg = {
    //                 type: 'success',
    //                 msg: `Congrats! You didn't have any form errors! This form will reset now.`,
    //               };
    //             triggerSnackBar(snackBarMsg);
    //             handleReset();
    //         }
    //     }
    // }

    // const top100Films = [
    //     { title: 'The Shawshank Redemption', year: 1994 },
    //     { title: 'The Godfather', year: 1972 },
    // ];
    // const [alignment, setAlignment] = useState('left');
    // const handleAlignment = (event, newAlignment) => {
    //     const evTxt = event.target.innerText.toLowerCase();
    //     setAlignment(evTxt);
    //     updateFormValues('toggleButton', evTxt);
    // };
    // const rows = [
    //     { name: 'Frozen yoghurt', calories: 159, fat: 6.0 },
    //     { name: 'Ice cream sandwich', calories: 237, fat: 9.0 },
    // ];

    const buildFormControl = (formControl, indx) => {
        const isVisible = formValues.find((fCntrl) => fCntrl.frmCntrl === formControl.frmCntrl)?.isVisible;
        switch (formControl.type) {
            case 'tggle':
            case isVisible:
                return <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={getValue(formControl.frmCntrl)}
                        exclusive
                        onChange={(event) => handleFormControlChange(event, formControl.frmCntrl)}
                        aria-label="Platform"
                    >
                        {
                            formControl.options.map((opt) =>
                                <ToggleButton value="opt">{opt}</ToggleButton>
                            )
                        }
                    </ToggleButtonGroup>
                </div>;
            case 'input':
            case isVisible:
                return <div></div>;
            case 'ddl':
            case isVisible:
                return <div></div>;
            case 'tier':
            case isVisible:
                return <div></div>;
            case 'cb':
            case isVisible:
                return <div></div>;
            case 'text':
            case isVisible:                
                return <div></div>;
            case '':
            case isVisible:
                return <div></div>;
            default:
            case !isVisible:
                return null;
        }
    };

    return (
        <div
            className='form'
        >
            {
                formQuestions.map((frmCntrl, index) =>
                    <div
                        className='control-container'
                    >
                        <div className='question-div'>
                            <span>
                                {frmCntrl.question}
                            </span>
                        </div>
                        <div
                            className='control-div'
                        >
                            {
                                buildFormControl(frmCntrl, index)
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default DynaForm;
