
import React from 'react';
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
    phone: 14
};

class Logon extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.clearState();
        this.isLoading = false;
        this.showPassword = false;
        this.isSignUp = false;
    }

    fu = () => {
        this.forceUpdate();
    }
    clearState = () => {
        return {
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
        };
    }
    hasErrors = (name, frmVal) => {
        let hasErr = frmVal.length <= (reqLength[name] || 3);
        hasErr =
            name === 'phone' ?
                (
                    frmVal.length > reqLength[name] ||
                    frmVal.length === 0
                ) :
                hasErr;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const emailTst = !emailRegex.test(frmVal);
        hasErr =
            name === 'eml' ?
                emailTst :
                hasErr;
        this.setState({ [`${name}Err`]: hasErr });
    }
    frmChanges = (e, bypass = null) => {
        let { name, value } = e.target;
        name = bypass ? bypass : name;
        this.setState(
            { [name]: value },
            () => {
                this.hasErrors(name, this.state[name])
            }
        );
    };

    login = (e) => {
        e.preventDefault();
        this.isLoading = true;
        let anyErrors = false;
        frmFields.forEach((fld) => {
            const failure = (!this.state[fld]) || (this.state[fld] && this.state[fld].length < reqLength[fld])
            if (failure) {
                anyErrors = true;
                this.setState({ [`${fld}Err`]: true });
            }
        });
        if (anyErrors) {
            this.isLoading = false;
            this.fu();
            alert('there was a form error');
            return;
        }
        this.isLoading = true;
        this.fu();
        setTimeout(() => {
            this.state = this.clearState();
            frmFields.forEach((fld) => {
                const ele = document.getElementById(fld);
                if (ele) {
                    ele.value = '';
                }
            })
            this.isLoading = false;
            this.fu();
            alert('Login successful!');
        }, 5000);
    };

    register = (e) => {
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
            const failure = (!this.state[fld]) || (this.state[fld] && this.state[`${fld}Err`]);
            if (failure) {
                anyErrors = true;
                this.setState({ [`${fld}Err`]: true });
            }
        });
        if (anyErrors) {
            this.isLoading = false;
            this.fu();
            alert('Theres a form error!');
            return;
        }
        this.isLoading = true;
        this.fu();
        setTimeout(() => {
            this.state = this.clearState();
            formFields.forEach((fld) => {
                const ele = document.getElementById(fld);
                if (ele) {
                    ele.value = '';
                }
            })
            this.isLoading = false;
            this.fu();
            alert('Register Successful!');
        }, 5000);        
    }

    toggleSignUp = () => {
        this.isSignUp = !this.isSignUp;
        this.fu();
    }

    forgotPassword = () => {
        alert('Forgot your password?! Too Bad!');
    }

    render() {
        return (
            <AppParent
                className='parent'
            >
                <div
                    className='child'
                    style={{
                        backgroundImage: `url(${logBG})`,
                    }}
                >
                    <Box
                        component="form"
                        autoComplete='false'
                        className={`${this.isSignUp ? 'sgnUp' : ''}`}
                    >
                        {
                            this.isLoading ?
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box> :
                                this.isSignUp ?
                                    <>
                                        <div
                                            className='lnk'
                                            onClick={this.toggleSignUp}
                                        >
                                            <ArrowBackIcon />
                                        </div>
                                        <FormControl
                                            className='fcS'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="userNameR">Username</InputLabel>
                                            <OutlinedInput
                                                id="userNameR"
                                                name="uNameR"
                                                type='text'
                                                onChange={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                error={this.state.uNameRErr}
                                                label="UserName Request"
                                            />
                                        </FormControl>
                                        <FormControl
                                            className='fcS'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                                            <OutlinedInput
                                                id="firstName"
                                                name="fName"
                                                type='text'
                                                onChange={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                error={this.state.fNameErr}
                                                label="First Name"
                                            />
                                        </FormControl>
                                        <FormControl
                                            className='fcS'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                            <OutlinedInput
                                                id="lastName"
                                                name="lName"
                                                type='text'
                                                onChange={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                error={this.state.lNameErr}
                                                label="Last Name"
                                            />
                                        </FormControl>
                                        <FormControl
                                            className='fcS'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="email">Email</InputLabel>
                                            <OutlinedInput
                                                id="email"
                                                name="eml"
                                                type='text'
                                                onChange={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                error={this.state.emlErr}
                                                label="Email"
                                            />
                                        </FormControl>
                                        <FormControl
                                            className='fcS'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="masked-input">Phone</InputLabel>
                                            <InputMask
                                                name="phone"
                                                mask="(999) 999-9999"
                                                value={this.state.phone}
                                                onChange={(e) => {
                                                    this.frmChanges(e, 'phone');
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e, 'phone');
                                                }}
                                                maskChar="_"
                                            >
                                                {(inputProps) => (
                                                    <OutlinedInput
                                                        {...inputProps}
                                                        label="Phone Number"
                                                        id="masked-input"
                                                    />
                                                )}
                                            </InputMask>
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            className='sbmt'
                                            onClick={(e) => this.register(e)}
                                        >Request SignUp</Button>
                                    </> :
                                    <>
                                        <FormControl
                                            className='fc unme'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="userName">Username</InputLabel>
                                            <OutlinedInput
                                                id="userName"
                                                name="uName"
                                                type='text'
                                                onChange={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                error={this.state.uNameErr}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <PersonOutlineOutlinedIcon />
                                                    </InputAdornment>
                                                }
                                                label="UserName"
                                            />
                                        </FormControl>
                                        <FormControl
                                            className='fc'
                                            variant="outlined"
                                        >
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                name="passW"
                                                type={this.showPassword ? 'text' : 'password'}
                                                onChange={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                onBlur={(e) => {
                                                    this.frmChanges(e);
                                                }}
                                                error={this.state.passWErr}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { this.showPassword = !this.showPassword; this.fu() }}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {this.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            className='sbmt'
                                            onClick={(e) => this.login(e)}
                                        >Login</Button>
                                        <div>
                                            <div
                                                className='lnk'
                                                onClick={this.forgotPassword}
                                            >Forgot password?</div>
                                        </div>
                                        <div
                                            className='unme acct'
                                        >
                                            <div>
                                                Don't have an account?
                                                <div
                                                    style={{
                                                        paddingLeft: '1%',
                                                        display: 'inline-block'
                                                    }}
                                                    className='lnk'
                                                    onClick={this.toggleSignUp}
                                                >
                                                    Sign Up
                                                </div>
                                            </div>
                                        </div>
                                    </>
                        }
                    </Box>
                </div>
            </AppParent>
        )
    }
}

export default Logon;