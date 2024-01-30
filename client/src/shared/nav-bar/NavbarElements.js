import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
background: rgba(2, 43, 149, 0.95);
height: 12vh;
display: flex;
justify-content: space-between;
z-index: 12;
position: fixed;
width: 100%;
/* Third Nav */
/* justify-content: flex-start; */
&.hide {
	-webkit-transform: translateY(-300px);
    -ms-transform: translateY(-300px);
    transform: translateY(-300px)
}
transition: -webkit-transform 0.75s ease;
transition: transform 0.75s ease;
`;

export const NavLink = styled.button`
color: #FFFFFF;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1.25rem;
height: 100%;
cursor: pointer;
background-color: rgba(0, 0, 0, 0);
border: none;
font-size: 1.25em;
background-position: center;
transition: background 0.8s;
&.active {
	color: #FFFFFF;
    border-bottom: 0.25em solid white;
	background-color: #6eb9f7;
	background-size: 100%;
	transition: background 0s;
	background: rgb(1, 22, 75);
}
&:hover {
    color: #0FDCE9 !important;
    border-bottom: 0.25em solid #0FDCE9;
	background: rgba(1, 22, 75, 0.75);
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
padding-left: 1em;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
	@media screen and (max-width: 760px) {
		/* display: none; */
	}
`;

export const NavBtn = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;
/* Third Nav */
/* justify-content: flex-end;
width: 100vw; */
	@media screen and (max-width: 760px) {
		/* display: none; */
	}
`;

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #808080;
padding: 10px 22px;
color: #000000;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
/* Second Nav */
margin-left: 24px;
&:hover {
	transition: all 0.2s ease-in-out;
	background: #fff;
	color: #808080;
}
`;
