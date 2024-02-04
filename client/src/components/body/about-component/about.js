
import React from 'react';
import { BodyPart, BodyPane, TextHolder } from '../bodyEls';
import headShot from '../../../shared/assets/Port.png';
import './about.css';

const About = () => {
  return (
    <BodyPart
      id='about'
      className='aboutS'
    >
      <BodyPane
        className='aboutPane'
      >
        <TextHolder
          className=''
        >
          <p 
            style={{
              marginTop: '6%',
            }}
            className='txt'
          >
            Hey! My name is Edward Hazell, <br/> I'm a highly motivated individual with a love 
            for the outdoors, traveling, learning, experiencing new cultures, meeting new 
            people, snowboarding, programming, and so so much more.
          </p>
          <p className='txt'>
            Over the years I've continued to enhance and refine my expertise in 
            Software Development and Engineering, both in the office and at home. 
            Software Engineering isn't just a position for me, it's something I 
            genuinely enjoy performing and learning more about whenever I can. 
            I personally feel that having the capability to provide information and 
            data in new ways to businesses and individuals is an incredible opportunity 
            and I eagerly look forward for more and new opportunities to learn.
          </p>
        </TextHolder>
      </BodyPane>
      <div
        className='profDiv'
      >
        <div
          className='profImg'
          style={{
            backgroundImage: `url(${headShot})`,
          }}
        ></div>
      </div>
    </BodyPart>
  );
};

export default About;