
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import InputMask from 'react-input-mask';


import './logon.css';
import { AppParent } from '../projectEls';
import logBG from './assets/logBG.png'

const frmFields = [
    'uName',
    'passW'
];
const reqLength = {
    uName: 3,
    passW: 7,
    eml: 5,
    phone: 10
};

const Logon = () => {
    const [formData, setFormData] = useState({
        uNameErr: false,
        passWErr: false,
        phoneErr: false,
        emlErr: false,
        lNameErr: false,
        fNameErr: false,
        uNameRErr: false,
        uName: '',
        passW: '',
        phone: '',
        eml: '',
        lName: '',
        fName: '',
        uNameR: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const clearState = () => {
        setFormData({
            uNameErr: false,
            passWErr: false,
            phoneErr: false,
            emlErr: false,
            lNameErr: false,
            fNameErr: false,
            uNameRErr: false,
            uName: '',
            passW: '',
            phone: '',
            eml: '',
            lName: '',
            fName: '',
            uNameR: '',
        });        
    };

    const filterPhoneVal = (val) => {
        const numbersOnly = val.match(/\d/g);
        return numbersOnly ? numbersOnly.join('') : '';
    }
    const hasErrors = (name, frmVal) => {
        let hasErr = frmVal.length <= (reqLength[name] || 3);
        if (name === 'phone') {
            frmVal = filterPhoneVal(frmVal);
            hasErr = (
                frmVal.length !== reqLength[name] || 
                frmVal.length === 0
            );
        }
        if (name === 'eml') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            hasErr = !emailRegex.test(frmVal);
        }
        return hasErr;
    };

    const frmChanges = (e, bypass = null) => {
        let { name, value } = e.target;
        name = bypass ? bypass : name;
        const nameHasErr = hasErrors(name, value);
        const nameErr = `${name}Err`;
        setFormData(prevState => {
            const updatedState = { 
                ...prevState, 
                [name]: value,
                [nameErr]: nameHasErr
            };
            return updatedState;
        });
    };

    const login = (e) => {
        e.preventDefault();
        setIsLoading(true);
        let anyErrors = false;
        frmFields.forEach((fld) => {
            const failure = (
                !formData[fld]) || 
                (formData[fld] && formData[fld].length <= reqLength[fld]
            );
            if (failure) {
                anyErrors = true;
                setFormData(prevState => ({ ...prevState, [`${fld}Err`]: true }));
            }
        });
        if (anyErrors) {
            setIsLoading(false);
            alert('there was a form error');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            console.log(formData);
            clearState();
            console.log(formData);
            setIsLoading(false);
            alert('Login successful!');
        }, 5000);
    };

    const register = (e) => {
        e.preventDefault();
        const formFields = [
            'uNameR',
            'fName',
            'lName',
            'eml',
            'phone'
        ];
        let anyErrors = false;
        formFields.forEach((fld) => {
            const failure = (!formData[fld]) || (formData[fld] && formData[`${fld}Err`]);
            if (failure) {
                anyErrors = true;
                setFormData(prevState => ({ ...prevState, [`${fld}Err`]: true }));
            }
        });
        if (anyErrors) {
            setIsLoading(false);
            alert('Theres a form error!');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            console.log(formData);
            clearState();
            console.log(formData);
            setIsLoading(false);
            alert('Register Successful!');
        }, 5000);
    };

    const toggleSignUp = () => {
        console.log(formData);
        clearState();
        console.log(formData);
        setIsSignUp(prevState => !prevState);
    };

    const forgotPassword = () => {
        alert('Forgot your password?! Too Bad!');
    };

    return (
        <div className='parent'>
            <div 
                className='child'
                style={{
                    backgroundImage: `url(${logBG})`,
                }}                
            >
                <Box
                    component="form"
                    autoComplete='false'
                    className={`${isSignUp ? 'sgnUp' : ''} ${isLoading ? 'spnr' : ''}`}
                >
                    {isLoading ? (
                        <Box 
                            sx={{ display: 'flex' }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : isSignUp ? (
                        <>
                            <div className='lnk' onClick={toggleSignUp}>
                                <ArrowBackIcon />
                            </div>
                            <FormControl className='fcS' variant="outlined">
                                <InputLabel htmlFor="userNameR">Username</InputLabel>
                                <OutlinedInput
                                    id="userNameR"
                                    name="uNameR"
                                    type='text'
                                    onChange={frmChanges}
                                    onBlur={frmChanges}
                                    error={formData.uNameRErr}
                                    label="UserName Request"
                                    autoComplete="username"
                                />
                            </FormControl>
                            <FormControl className='fcS' variant="outlined">
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <OutlinedInput
                                    id="firstName"
                                    name="fName"
                                    type='text'
                                    onChange={frmChanges}
                                    onBlur={frmChanges}
                                    error={formData.fNameErr}
                                    label="First Name"
                                    autoComplete="firstname"
                                />
                            </FormControl>
                            <FormControl className='fcS' variant="outlined">
                                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                <OutlinedInput
                                    id="lastName"
                                    name="lName"
                                    type='text'
                                    onChange={frmChanges}
                                    onBlur={frmChanges}
                                    error={formData.lNameErr}
                                    label="Last Name"
                                    autoComplete="lastname"
                                />
                            </FormControl>
                            <FormControl className='fcS' variant="outlined">
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput
                                    id="email"
                                    name="eml"
                                    type='text'
                                    onChange={frmChanges}
                                    onBlur={frmChanges}
                                    error={formData.emlErr}
                                    label="Email"
                                    autoComplete="email"
                                />
                            </FormControl>
                            <FormControl className='fcS' variant="outlined">
                                <InputLabel htmlFor="masked-input">Phone</InputLabel>
                                <InputMask
                                    name="phone"
                                    mask="(999) 999-9999"
                                    value={formData.phone}
                                    onChange={(e) => frmChanges(e, 'phone')}
                                    onBlur={(e) => frmChanges(e, 'phone')}
                                    error={formData.phoneErr}
                                    maskChar="_"
                                >
                                    {(inputProps) => (
                                        <OutlinedInput
                                            {...inputProps}
                                            label="Phone Number"
                                            id="masked-input"
                                            autoComplete="phone"
                                        />
                                    )}
                                </InputMask>
                            </FormControl>
                            <Button variant="contained" className='sbmt' onClick={register}>Request SignUp</Button>
                        </>
                    ) : (
                        <>
                            <FormControl className='fc unme' variant="outlined">
                                <InputLabel htmlFor="userName">Username</InputLabel>
                                <OutlinedInput
                                    id="userName"
                                    name="uName"
                                    type='text'
                                    onChange={frmChanges}
                                    onBlur={frmChanges}
                                    error={formData.uNameErr}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <PersonOutlineOutlinedIcon />
                                        </InputAdornment>
                                    }
                                    label="UserName"
                                    autoComplete="username"
                                />
                            </FormControl>
                            <FormControl className='fc' variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    name="passW"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={frmChanges}
                                    onBlur={frmChanges}
                                    error={formData.passWErr}
                                    autoComplete="password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <Button variant="contained" className='sbmt' onClick={login}>Login</Button>
                            <div className='lnk' onClick={forgotPassword}>Forgot password?</div>
                            <div className='unme acct'>
                                <div>
                                    Don't have an account?
                                    <div style={{ paddingLeft: '1%', display: 'inline-block' }} className='lnk' onClick={toggleSignUp}>
                                        Sign Up
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Box>
            </div>
        </div>
    );
};

export default Logon;