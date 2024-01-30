
import React from 'react';
import About from './about-component/about';
import Resume from './resume-component/resume';
import CampFire from './camp-site-component/camp-site';
import Contact from './contact-component/contact';
import { TheBody } from './bodyEls';

class Body extends React.Component {
  render () {
    const { notAtCampFire } = this.props;

    return (
      <TheBody>
      <About />
      <Resume />
      <CampFire notAtCampFire={notAtCampFire} />
      <Contact />
    </TheBody>
    );
  }
};
  
export default Body;