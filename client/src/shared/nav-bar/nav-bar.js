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
import './nav-bar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.isMobile = false;
        this.isIcon = true;
        this.stateView = '';

        this.doSz = null;
    }
    state = {
        curView: ''
    };
    isActive = (event, to) => {
        if (to) {
            this.setState({
                curView: to
            });
            document.getElementById(to).scrollIntoView({
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
                const to = this.state.curView;
                console.log(`curView: ${to} | stateView: ${this.stateView}`);
                this.isActive(null, to);
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
        const { curView } = this.state;
        const { notAtCampFire } = this.props;
        return (
            <>
                {
                    this.isMobile &&
                    <div
                        className={`
                                menIco
                                ${this.isIcon ? '' : 'hide'}
                                ${this.isMobile ? '' : 'hide'}
                            `}
                        style={{
                            zIndex: '650',
                        }}
                        onClick={this.showMenu}
                    >
                        <MenuIcon />
                    </div>
                }
                <Nav
                    id='nav'
                    className={`
                                ${notAtCampFire ? '' : 'hide '}
                                ${this.isIcon ? 'hideNav' : 'showNav'}
                            `}
                    style={{
                        zIndex: '650',
                    }}
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
                        </div>
                    </NavMenu>
                </Nav>
            </>
        );
    }
}

export default Navbar;