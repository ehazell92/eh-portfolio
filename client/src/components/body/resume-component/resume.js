
import React from 'react';
import { BodyPart } from '../bodyEls';
import {
  lftSkills, rghtSkills, frontEnd, backEnd, ifr, certsVolun
} from '../../../shared/constants';
import StarIcon from '@mui/icons-material/Star'
import HouseIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import './resume.css';



class Resume extends React.Component {
  triggerContactUs= () => {
    document.getElementById('nav-contact').click();
  }
  render() {
    return (
      <BodyPart
        id='resume'
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'block',
          color: 'white',
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div
          className='main'
        >
          <div
            className='header'
          >
            <div 
              className='name'
            >
              <span className='nameSpn'>
                Edward <br />
                Hazell
              </span>
            </div>
            <div className='contact'>
              <div
                className='icn'
              ><HouseIcon /></div>
              <div>
                <a 
                  className='link'
                  target="_blank"
                  href="https://maps.google.com/?q=Seattle, WA"
                >Seattle, WA</a>
              </div>
              <div
                className='icn'
              ><EmailIcon /></div>
              <div 
                onClick={this.triggerContactUs}>
                  <span className='link'>Contact Us</span>
              </div>
              <div
                className='icn'
              ><GitHubIcon /></div>
              <div>
                <a
                  className='link'
                  href="http://www.github.com/ehazell92">ehazell92</a>
              </div>
            </div>
            <div className='headShot'>
              <div id='hdSht'></div>
            </div>
          </div>
          <div
            className='experience'
          >
            <div
              className='leftDetails'
            >
              {lftSkills.map((skill, i) =>
                <div
                  className='detailsDiv'
                >
                  <div>
                    <span
                      className='title'
                    >{skill.title}</span>
                    <span
                      className='date'
                    >{skill.date}</span>
                  </div>
                  <div>
                    <span
                      className='location'
                    >{skill.location}</span>
                  </div>
                  <div>
                    <ul
                      className='bullets'
                    >
                      {skill.skills.map((s) => (
                        <li 
                          key={`${s}-li`}
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div
              className='rightDetails'
            >
              {rghtSkills.map((skill, i) =>
                <div
                  className='detailsDiv'
                >
                  <div>
                    <span
                      className='title'
                    >{skill.title}</span>
                    <span
                      className='date'
                    >{skill.date}</span>
                  </div>
                  <div>
                    <span
                      className='location'
                    >{skill.location}</span>
                  </div>
                  <div>
                    {skill.skills.length > 0 &&
                      <ul
                        className='bullets'
                      >
                        {
                          skill.skills.map((s) => (
                            <li 
                              key={`${s}-li`}
                            >
                              {s}
                            </li>
                          ))
                        }
                      </ul>
                    }
                  </div>
                </div>
              )}
              <br />
              <span
                className='mainTitle'
              >EDUCATION</span>
              <div
                className='detailsDiv'
              >
                <div>
                  <span
                    className='title'
                  >B.S. Computer Science</span>
                  <span
                    className='date'
                  >03/2014 - 08/2015</span>
                </div>
                <div>
                  <span
                    className='location'
                  >Thomas Edison State University, Trenton, NJ</span>
                </div>
              </div>
              <br/>
              <span
                className='mainTitle'
              >SKILLS</span>
              <div
                className='skills'
              >
                <div
                  className='frontEnd'
                >
                  <span>FrontEnd</span> <br />
                  {frontEnd.map((fe) =>
                    <>
                      <div
                        className='skillTitle'
                      >{fe.title}</div>
                      <div
                        className='skillExp'
                      >
                        {
                          Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon 
                              key={`star-${index}`}
                              className={`
                                ${(index+1) <= fe.stars ? 'star' : 'star-bl'}
                              `}
                            />
                          ))
                        }
                      </div>
                    </>
                  )}
                </div>
                <div
                  className='backEnd'
                >
                  <span>BackEnd</span> <br />
                  {backEnd.map((be) =>
                    <>
                      <div
                        className='skillTitle'
                      >{be.title}</div>
                      <div
                        className='skillExp'
                      >
                        {
                          Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon 
                              key={`star-${index}`}
                              className={`
                                ${(index+1) <= be.stars ? 'star' : 'star-bl'}
                              `}
                            />
                          ))                        
                        }
                      </div>
                    </>
                  )}
                </div>
                <div
                  className='infrastructure'
                >
                  <span>Infrastructure</span>
                  {ifr.map((ir) =>
                    <>
                      <div
                        className='skillTitle'
                      >{ir.title}</div>
                      <div
                        className='skillExp'
                      >
                        {
                          Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon 
                              key={`star-${index}`}
                              className={`
                                ${(index+1) <= ir.stars ? 'star' : 'star-bl'}
                              `}                              
                            />
                          ))                        
                        }
                      </div>
                    </>
                  )}
                </div>
              </div>
              <br/>
              <span
                className='mainTitle'
              >CERTIFICATIONS & VOLUNTEERING</span>
              <div
                className='detailsDiv'
                style={{
                  paddingBottom: '4%',
                }}
              >
                {certsVolun.map((certs, i) =>
                  <>
                    <div>
                      <span
                        className='title'
                      >{certs.title}</span>
                      <span
                        className='date'
                      >{certs.date}</span>
                    </div>
                    <div>
                      <span
                        className='location'
                      >{certs.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </BodyPart>
    );
  };
}

export default Resume;