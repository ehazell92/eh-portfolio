
import React from 'react';
import About from './about-component/about';
import Resume from './resume-component/resume';
import Portfolio from './portfolio-component/portfolio';
import Contact from './contact-component/contact';
import { TheBody } from './bodyEls';

class Body extends React.Component {
  render () {
    const { notAtCampFire } = this.props;

    return (
      <TheBody>
      <About />
      <Resume />
      <Portfolio notAtCampFire={notAtCampFire} />
      <Contact />
    </TheBody>
    );
  }
};
  
export default Body;