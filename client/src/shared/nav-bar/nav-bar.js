import React from 'react';
import {
    Nav,
    NavLink,
    NavMenu,
} from './NavbarElements';
import { navBarOptions } from '../constants';

class Navbar extends React.Component {
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
    };
    componentDidMount() {
        document.getElementsByClassName('navLink')[0].click();
    };
    render() {
        const { curView } = this.state;
        const { notAtCampFire } = this.props;
        return (
            <Nav
                id='nav'
                className={`
                    ${notAtCampFire ? '' : 'hide '}
                `}
                style={{
                    zIndex: '650',
                }}
            >
                <NavMenu>
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
        );
    }
}

export default Navbar;