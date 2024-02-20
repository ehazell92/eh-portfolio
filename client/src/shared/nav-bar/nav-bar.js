import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
} from './NavbarElements';
import { navBarOptions } from '../constants';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DownloadIcon from '@mui/icons-material/Download';
import EHResumePDF from '../../shared/assets/docs/EdwardHazellResumeW.pdf'
import './nav-bar.css';

/* eslint-disable no-restricted-globals */

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.isMobile = false;
        this.isIcon = true;
        this.stateView = '';

        this.doSz = null;
        this.handleClose = this.handleClose.bind(this);
        this.tggleDwnload = this.tggleDwnload.bind(this);
    }
    state = {
        curView: '',
        anchorEl: false,
        open: false,
    };
    tggleDwnload = (ev) => {
        this.setState({ anchorEl: ev.currentTarget });
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    }
    downloadFile = (fileType) => {
        const link = document.createElement('a');
        link.href = EHResumePDF;
        link.download = 'EdwardHazellResume.pdf'; // Specify the file name
        link.click();
        this.handleClose();
    }
    isActive = (event, to) => {
        const docEl = document.getElementById(to);
        if (
            to &&
            docEl
        ) {
            this.setState({
                curView: to
            });
            docEl.scrollIntoView({
                block: 'end',
                behavior: 'smooth'
            });
            this.props.setCurrentView(to);
            this.stateView = to;
            setTimeout(() => {
                this.isIcon = true;
                this.forceUpdate();
            }, 500);
        }
    };
    windowHandler = () => {
        this.doSz = true;
        this.isMobile = window.innerWidth <= 760;
        this.forceUpdate();

        setTimeout(() => {
            this.doSz = false;
            if (!this.doSz) {
                this.isActive(null, this.state.curView);
            }
        }, 500);
    }
    routeTo = (rte) => {
        window.open(rte, '_blank');
    }
    componentDidMount() {
        document.getElementsByClassName('navLink')[0].click();
        window.addEventListener('resize', this.windowHandler);
        window.addEventListener('click', (ev) => this.handleMenuClick(ev));
        this.windowHandler();
    };
    handleMenuClick = (ev) => {
        ev.preventDefault();
        const escapeEl = (
            ev.target.classList.contains('navLink')
        ) || (
                ev.target.localName === 'path' ||
                ev.target.localName === 'svg'
            );
        if (escapeEl) {
            return;
        }
        if (!this.isIcon) {
            this.showMenu();
        }
    }
    showMenu = () => {
        this.isIcon = !this.isIcon;
        this.forceUpdate();
    }
    render() {
        const { curView, anchorEl } = this.state;
        const { notAtCampFire } = this.props;
        return (
            <>
                {
                    this.isMobile &&
                    <div
                        id='mbl-nav'
                        className={`
                                menIco zDex
                                ${this.isIcon ? '' : 'hide'}
                                ${this.isMobile ? '' : 'hide'}
                            `}
                        onClick={this.showMenu}
                    >
                        <MenuIcon />
                    </div>
                }
                <Nav
                    id='nav'
                    className={`
                                zDex
                                ${notAtCampFire ? '' : 'hide '}
                                ${this.isIcon ? 'hideNav' : 'showNav'}
                            `}
                >
                    <NavMenu
                        className='navMnu'
                    >
                        {
                            navBarOptions.map((el, i) => <NavLink
                                key={i}
                                aria-haspopup="true"
                                className={`
                                    navLink 
                                    ${curView === el.to ? 'active ' : ''}
                                `}
                                id={`nav-${el.to}`}
                                onClick={(event) => this.isActive(event, el.to)}
                            >
                                {el.type}
                            </NavLink>)
                        }
                        <div
                            className='icoLinks'
                        >
                            <div>
                                <IconButton
                                    onClick={() => this.routeTo(
                                        "https://www.linkedin.com/in/EdwardHazell/"
                                    )}
                                    aria-label="Go to my LinkedIn"
                                >
                                    <LinkedInIcon />
                                </IconButton>
                            </div>
                            <div>
                                <IconButton
                                    onClick={() => this.routeTo(
                                        "https://github.com/ehazell92"
                                    )}
                                    aria-label="Go to my GitHub"
                                >
                                    <GitHubIcon />
                                </IconButton>
                            </div>
                            <div>
                                <Tooltip title="Files to download">
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="dropdown-menu"
                                        aria-haspopup="true"
                                        onClick={this.tggleDwnload}
                                    >
                                        <DownloadIcon sx={{ width: 32, height: 32 }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id="dropdown-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                    classes={{
                                        paper: 'ddl-opt'
                                    }}
                                >
                                    {/* <MenuItem onClick={() => this.downloadFile(0)}>
                                        DOCX Resume
                                    </MenuItem> */}
                                    <MenuItem 
                                        onClick={() => this.downloadFile(1)}
                                    >
                                        Download My Resume
                                    </MenuItem>
                                </Menu>
                            </div>                            
                        </div>
                    </NavMenu>
                </Nav>
            </>
        );
    }
}

export default Navbar;