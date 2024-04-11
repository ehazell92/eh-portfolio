import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Container, Autocomplete, Checkbox, FormControlLabel, Radio, RadioGroup, Rating, Slider, Switch, ToggleButton, ToggleButtonGroup, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './dyna-form.css';
import { triggerSnackBar } from '../../../../../services/app-service';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const tierModel = {
    type: 'tier',
    frmCntrl: 'fifthQuest1',
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
        options: [1, 2, 3],
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
    let isSubmit = false;
    const [formValues, setFormValues] = useState(formQuestions);
    const [formErrors, setFormErrors] = useState({});

    const handleFormControlChange = async (event, cntrlName) => {
        const cntrlVal = event.target.value || event.target.innerText;
        const cntrlValErr = controlValueValid(cntrlName, cntrlVal);
        let controlIndx = null;
        const newFormVals = formValues.map(
            (frmCntrl, indx) => {
                if (frmCntrl.frmCntrl === cntrlName) {
                    controlIndx = indx;
                    return {
                        ...frmCntrl,
                        value: cntrlVal,
                        hasError: cntrlValErr,
                    };
                } else {
                    const showNext =
                        (controlIndx !== null && controlIndx === (indx - 1)) ?
                            shouldShowNextQuestion(frmCntrl, cntrlVal) :
                            frmCntrl.isVisible;
                    const updateOpts = shouldUpdateOpts(frmCntrl, cntrlVal);
                    return {
                        ...frmCntrl,
                        isVisible: showNext
                    };
                }
            }
        );
        setFormValues(newFormVals);
    };
    const updateFormControlValues = (frmObj, chkErrs = false) => {
        setFormValues(frmObj);
        if (!chkErrs) {
            checkFormErrors();
        }
    };
    const controlValueValid = (cntrlName, cntrlVal) => {
        return (!cntrlVal || cntrlVal.length === 0);
    };
    const shouldShowNextQuestion = (ctrl, val) => {
        if (['fifthQuest'].includes(ctrl.frmCntrl)) {
            return val !== null;
        }
        return val.toLowerCase() === 'yes';
    };
    const shouldUpdateOpts = (ctrl, prevCtrlVal) => {
        if (['fifthQuest'].includes(ctrl.frmCntrl)) {
            return prevCtrlVal;
        }
        return ctrl.options;
    };
    const checkFormErrors = () => {
        const newFrmVals = formValues.map((frmCntrl) => {
            const frmVal = frmCntrl.value || null;
            const frmValErr = frmCntrl.isVisible ? controlValueValid(frmCntrl.frmCntrl, frmVal) : false;
            return {
                ...frmCntrl,
                hasError: frmValErr,
            };
        });
        updateFormControlValues(newFrmVals, true);
        if (isSubmit) {
            const currentErrors = newFrmVals.filter(
                (frmCntrl) => frmCntrl.hasError
            ) || [];
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
                isSubmit = false;
            }
        } else {
            console.log(formValues);
        }
    };

    const performSubmission = () => {
        console.log('doing things here');
    };

    const handleSubmission = (ev) => {
        isSubmit = true;
        ev.preventDefault();
        checkFormErrors();
    };

    useEffect(() => {
        if (isSubmit) {
            checkFormErrors();
        }
    }, [formValues]);

    const handleReset = () => {
        isSubmit = false;
        setFormValues(formQuestions);
    };

    const buildFormControl = (formControl, indx) => {
        switch (formControl.type) {
            case 'tggle':
                return <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={formControl.value}
                        exclusive
                        onChange={(event) => handleFormControlChange(event, formControl.frmCntrl)}
                        aria-label="Platform"
                    >
                        {
                            formControl.options.map((opt) =>
                                <ToggleButton
                                    value={opt}
                                >{opt}</ToggleButton>
                            )
                        }
                    </ToggleButtonGroup>
                </div>;
            case 'input':
                return <div>
                    <TextField
                        id={formControl.frmCntrl}
                        onChange={(event) => handleFormControlChange(event, formControl.frmCntrl)}
                        label="See Fourth Question?"
                        variant="outlined"
                    />
                </div>;
            case 'ddl':
                return <div>
                    <InputLabel id="ddl-demo">Tiers</InputLabel>
                    <Select
                        labelId="ddl-demo"
                        id={formControl.frmCntrl}
                        value={formControl.value}
                        label="Tiers Select"
                        onChange={(event) => handleFormControlChange(event, formControl.frmCntrl)}
                    >
                        {
                            formControl.options.map((opt) => 
                                <MenuItem value={opt}>{opt}</MenuItem>
                            )
                        }
                    </Select>
                </div>;
            case 'tier':
                return <div></div>;
            case 'cb':
                return <div></div>;
            case 'text':
                return <div></div>;
            case '':
                return <div></div>;
            default:
                return null;
        }
    };

    return (
        <div
            className='frm'
        >
            {
                formValues.length > 0 &&
                <>
                    <div
                        className='controls-container'
                    >
                        {
                            formValues.map((frmCntrl, index) =>
                                <div
                                    className='control'
                                >
                                    {
                                        frmCntrl.isVisible &&
                                        <>
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
                                            {
                                                frmCntrl.hasError &&
                                                <div>
                                                    <span
                                                        className='err'
                                                    >
                                                        This is a required field *
                                                    </span>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div
                        className='btn-container'
                    >
                        <Button
                            className='btn'
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={(event) => { handleSubmission(event); }}
                        >
                            Submit
                        </Button>
                        <Button
                            className='btn2'
                            color="secondary"
                            variant="contained"
                            fullWidth
                            onClick={handleReset}
                        >
                            Clear
                        </Button>
                    </div>
                </>
            }
        </div >
    );
};

export default DynaForm;
