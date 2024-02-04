import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
} from './NavbarElements';
import { navBarOptions } from '../constants';
import MenuIcon from '@mui/icons-material/Menu';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.isMobile = false;
        this.isIcon = true;
    }
    state = {
        curView: ''
    };
    isActive = (event, to) => {
        this.setState({
            curView: to
        });
        document.getElementById(to).scrollIntoView({
            block: 'end',
            behavior: 'smooth'
        });
        this.props.setCurrentView(to);
        setTimeout(() => {
            this.isIcon = true;
            this.forceUpdate();
        }, 500);
    };
    windowHandler = () => {
        this.isMobile = window.innerWidth <= 760;
        this.forceUpdate();
    }
    componentDidMount() {
        document.getElementsByClassName('navLink')[0].click();
        window.addEventListener('resize', this.windowHandler);
        this.windowHandler();
    };
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
                    </NavMenu>
                </Nav>
            </>
        );
    }
}

export default Navbar;