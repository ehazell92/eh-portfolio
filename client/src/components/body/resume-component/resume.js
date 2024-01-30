
import React from 'react';
import { BodyPart } from '../bodyEls';
import edHResume from '../../../shared/assets/docs/EdwardHazellResume.pdf';

import './resume.css';

const lftSkills = [
  {
    title: 'Lead Software Engineer',
    date: '06/2023 - Present',
    location: 'Softrams, Leesburg, VA',
    skills: [
      'Elevated to the position of Lead Software Engineer while successfully working in a Fully Remote capacity.',
      'Engineered multiple AWS Lambda configurations utilizing SQS, CloudWatch, and S3 to modernize and optimize outdated module functionality where applicable.',
      'Oversee the ongoing development and enhancement of five distinct application modules.',
      'Implemented Test-Driven Development (TDD) for applications using SonarQube, Jasmin, Sinon, and Chai, achieving over 85% coverage across all components and services in each module.',
      'Led team development meetings for sprint planning, JIRA task delegation, sprint delivery deadlines, while also coordinating with Business Analysts (BA), Business Owners (BO), and Project Managers (PM) for effective planning and major application releases.',
      'Facilitated communication with clients, addressing change requests, overseeing defect resolution processes, and ensuring project success through comprehensive briefing meetings.',
      'Utilized Splunk, Snyk, Storybook, and Wave 508 Compliance tools to maintain application efficiency and uphold industry standards for delivery and performance.',
      'Managed application module environment deployments and release schedules, incorporating regression testing, 508 compliance, and deploying to Production as scheduled.',
      'Facilitated interdepartmental communication, planning, and resource coordination for organization-wide deadline compliance.',
      'Developed a unified NPM for company-wide use, reducing redundant code for File Validations, Email/Template Building, and other shared functionalities across all teams.',
      'Collaborated with team members to offer mentorship and guidance, while promoting effective and proficient development standards'
    ]
  },
  {
    title: 'Senior FS Software Engineer',
    date: '12/2021 - 06/2023',
    location: 'Softrams, Leesburg, VA',
    skills: [
      'Elevated to the position of Lead Software Engineer while successfully working in a Fully Remote capacity.',
      'Engineered multiple AWS Lambda configurations utilizing SQS, CloudWatch, and S3 to modernize and optimize outdated module functionality where applicable.',
      'Oversee the ongoing development and enhancement of five distinct application modules.',
      'Implemented Test-Driven Development (TDD) for applications using SonarQube, Jasmin, Sinon, and Chai, achieving over 85% coverage across all components and services in each module.',
      'Led team development meetings for sprint planning, JIRA task delegation, sprint delivery deadlines, while also coordinating with Business Analysts (BA), Business Owners (BO), and Project Managers (PM) for effective planning and major application releases.',
      'Facilitated communication with clients, addressing change requests, overseeing defect resolution processes, and ensuring project success through comprehensive briefing meetings.',
      'Utilized Splunk, Snyk, Storybook, and Wave 508 Compliance tools to maintain application efficiency and uphold industry standards for delivery and performance.',
      'Managed application module environment deployments and release schedules, incorporating regression testing, 508 compliance, and deploying to Production as scheduled.',
      'Facilitated interdepartmental communication, planning, and resource coordination for organization-wide deadline compliance.',
      'Developed a unified NPM for company-wide use, reducing redundant code for File Validations, Email/Template Building, and other shared functionalities across all teams.',
      'Collaborated with team members to offer mentorship and guidance, while promoting effective and proficient development standards'
    ]
  },
];
const rghtSkills = [
  {
    title: 'Software Engineer',
    date: '05/2018 - 12/2021',
    location: 'Topcon Healthcare Solutions, Oakland, NJ',
    skills: [
      'Elevated to the position of Lead Software Engineer while successfully working in a Fully Remote capacity.',
      'Engineered multiple AWS Lambda configurations utilizing SQS, CloudWatch, and S3 to modernize and optimize outdated module functionality where applicable.',
      'Oversee the ongoing development and enhancement of five distinct application modules.',
      'Implemented Test-Driven Development (TDD) for applications using SonarQube, Jasmin, Sinon, and Chai, achieving over 85% coverage across all components and services in each module.',
      'Led team development meetings for sprint planning, JIRA task delegation, sprint delivery deadlines, while also coordinating with Business Analysts (BA), Business Owners (BO), and Project Managers (PM) for effective planning and major application releases.',
      'Facilitated communication with clients, addressing change requests, overseeing defect resolution processes, and ensuring project success through comprehensive briefing meetings.',
      'Utilized Splunk, Snyk, Storybook, and Wave 508 Compliance tools to maintain application efficiency and uphold industry standards for delivery and performance.',
      'Managed application module environment deployments and release schedules, incorporating regression testing, 508 compliance, and deploying to Production as scheduled.',
      'Facilitated interdepartmental communication, planning, and resource coordination for organization-wide deadline compliance.',
      'Developed a unified NPM for company-wide use, reducing redundant code for File Validations, Email/Template Building, and other shared functionalities across all teams.',
      'Collaborated with team members to offer mentorship and guidance, while promoting effective and proficient development standards'
    ]
  },  
  {
    title: 'Software Engineer',
    date: '01/2016 - 04/2018',
    location: 'MedLabs Diagnostics, Cedar Knolls, NJ',
    skills: []
  },  
  {
    title: 'IT Support Specialist',
    date: '03/2013 - 12/2015',
    location: 'Laboratory Corporation of America, Raritan, NJ',
    skills: []
  },
];
const certsVolun = [
  {
    title: 'Certified SAFe(R) 5 Practitioner',
    date: '11/2022',
    location: 'Scaled Agile, Inc',
    skills: []
  },  
  {
    title: 'WA State Parks',
    date: '08/2021 - Present',
    location: 'Campground Volunteer Program, Washington',
    skills: []
  },
  {
    title: 'XR Immersive',
    date: '06/2018 - 06/2018',
    location: 'Games for Change, New York, New York',
    skills: []
  },  
];

const frontEnd = [
  { title: 'Angular v.16', stars: 5},
  { title: 'React', stars: 3},
  { title: 'TypeScript', stars: 5},
  { title: 'JavaScript - ES6', stars: 5},
  { title: 'RxJS', stars: 5},
  { title: 'HTML5', stars: 5},
  { title: 'Sass / CSS3', stars: 5},
  { title: 'jQuery', stars: 4},
];
const backEnd = [
  { title: 'Node.js', stars: 4},
  { title: 'Express.js', stars: 4},
  { title: 'SQL', stars: 4},
  { title: 'Oracle', stars: 4},
  { title: 'MongoDB', stars: 3},
  { title: 'ASP.NET', stars: 3},
];
const ifr = [
  { title: 'Amazon Web Services', stars: 4},
  { title: 'Visual Studio Code', stars: 5},
  { title: 'Jira | Kanban', stars: 5},
  { title: 'GitHub | Kanban', stars: 5},
  { title: 'Confluence', stars: 4},
  { title: 'Jenkins', stars: 4},
  { title: 'Figma', stars: 3},
  { title: 'MS Active Directory', stars: 4},
  { title: 'Postman', stars: 4},
  { title: 'Splunk', stars: 4},
  { title: 'SonarQube', stars: 4},
  { title: 'Snyk', stars: 3},
  { title: 'Wave 508', stars: 4},
  { title: 'Cacher', stars: 2},
  { title: 'DBeaver', stars: 3},
  { title: 'MySQL', stars: 4},
];

class Resume extends React.Component {
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
            <div className='name'>
              Edward <br/>
              Hazell
            </div>
            <div className='contact'>
              <div>[X]</div><div>Seattle, WA</div>
              <div>[X]</div><div>ehazell.com</div>
              <div>[X]</div><div>(862) 432-5993</div>
              <div>[X]</div><div>github.com/ehazell92</div>
              <div>[X]</div><div>ehazell94@gmail.com</div>
            </div>
            <div className='headShot'>
              (          )
              ( Pic Here )
              (          )
            </div>
          </div>
          <div
            className='experience'
          >
            <div
              className='leftDetails'
            >
              {lftSkills.map((skill, i) => 
                <div>
                  <h2>{skill.title}</h2> - <span>{skill.date}</span> <br/>
                  <h4>{skill.location}</h4> <br/>
                  <ul>
                    {skill.skills.map((s) => (
                        <li key={`${s}-li`}>
                          {s}
                        </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div
              className='rightDetails'
            >
              {rghtSkills.map((skill, i) => 
                <div>
                  <h2>{skill.title}</h2> - <span>{skill.date}</span> <br/>
                  <h4>{skill.location}</h4> <br/>
                  { skill.skills.length > 0 &&
                    <ul>
                    {
                      skill.skills.map((s) => (
                        <li key={`${s}-li`}>
                          {s}
                        </li>
                      ))
                    }
                  </ul>
                  }
                </div>
              )}
              <br/>
              <div>
                  <h1>EDUCATION</h1> <br/>
                  <h2>B.S. Computer Science</h2> - <span>03/2014 - 08/2015</span> <br/>
                  <h4>Thomas Edison State University, Trenton, NJ</h4> <br/>
              </div> <br/>
              <h1>SKILLS</h1> <br/>
              <div
                className='skills'
              >
                <div
                  className='frontEnd'
                >
                  <span>FrontEnd</span> <br/>
                  {frontEnd.map((fe) => 
                      <>
                        <div>{fe.title}</div>
                        <div>{'X'.repeat(fe.stars)}</div>
                      </>
                  )}
                </div>
                <div
                  className='backEnd'
                >
                  <span>BackEnd</span> <br/>
                  {backEnd.map((be) => 
                      <>
                        <div>{be.title}</div>
                        <div>{'X'.repeat(be.stars)}</div>
                      </>
                  )}
                </div>
                <div
                  className='infrastructure'
                >
                  <span>Infrastructure</span> <br/>
                  {ifr.map((ir) => 
                      <>
                        <div>{ir.title}</div>
                        <div>{'X'.repeat(ir.stars)}</div>
                      </>
                  )}
                </div>
                <br/>
              <div>
                  <h1>CERTIFICATIONS & VOLUNTEERING</h1> <br/>
                  {certsVolun.map((certs, i) => 
                    <div>
                      <h2>{certs.title}</h2> - <span>{certs.date}</span> <br/>
                      <h4>{certs.location}</h4> <br/>
                    </div>
                  )}
              </div>                
              </div>
            </div>
          </div>

          {/* <embed 
            src={edHResume + '#toolbar=0&navpanes=0&scrollbar=0"'} 
            style={{
              margin: '0 auto',
              height: '100%',
              width: '50vw',
              display: 'block',
            }}
          /> */}
        </div>
      </BodyPart>
    );
  };
}

export default Resume;