import Logon from "../components/body/portfolio-component/projects/logon/logon";
import Weather from "../components/body/portfolio-component/projects/weather/weather";
import logBg from "../components/body/portfolio-component/assets/LogonAppImg.webp";
import wthBg from "../components/body/portfolio-component/assets/WeatherAppImg.webp";
import mailBg from "../components/body/portfolio-component/assets/MailAppImg.webp";
import Mail from "../components/body/portfolio-component/projects/mail/mail";
import FormC from "../components/body/portfolio-component/projects/form/form";
import DynmcRctBg from "../components/body/portfolio-component/assets/DynmcCmpImg.webp";
import BscRctBg from "../components/body/portfolio-component/assets/BscRctAppImg.webp";
import SndBxBg from "../components/body/portfolio-component/assets/SndBxAppImg.webp";
import CmngSnBg from "../components/body/portfolio-component/assets/CmngSoonImg.webp";
import DynaForm from "../components/body/portfolio-component/projects/dynamic-form/dyna-form";

export const navBarOptions = [
  {
    type: "About",
    to: "about",
  },
  {
    type: "Resume",
    to: "resume",
  },
  {
    type: "Portfolio",
    to: "portfolio",
  },
  {
    type: "Contact",
    to: "contact",
  },
];

export const portfolioOptions = [
  {
    id: "Logon",
    name: "Logon Component",
    label:
      "A basic logon component for logging in, or registering if unregistered.",
    title: "Logon Component Developed by Edward Hazell",
    etc: "React",
    bgImg: logBg,
    cmp: <Logon />,
  },
  // {
  //     id: 'weather',
  //     name: 'Weather Component',
  //     label: 'A basic weather component used for searching for one or multiple forecast reports.',
  //     external: false,
  //     etc: 'React',
  //     bgImg: wthBg,
  //     cmp: <Weather />
  // },
  {
    id: "dashboard",
    name: "Mail Component",
    label:
      "This is a basic mail dashboard component for viewing and managing mail.",
    external: false,
    etc: "React",
    bgImg: mailBg,
    cmp: <Mail />,
  },
  {
    id: "dynafrmnt",
    name: "Dynamic Form Component",
    label: "DFC is gonna be sick!",
    external: false,
    etc: "React",
    cmp: <DynaForm />,
    bgImg: DynmcRctBg,
  },
  {
    id: "Form",
    name: "Basic React Component(s)",
    label:
      "The Basic React component(s) are an extremely basic example of some of the React MUI components and minor validation on those being required to submit.",
    external: false,
    etc: "React",
    cmp: <FormC />,
    bgImg: BscRctBg,
  },
  {
    id: "App9",
    name: "AI",
    label: "Deehv is a sandbox for development by Edward Hazell",
    external: "https://deehv-94b3d7c81638.herokuapp.com/guest",
    title: "Web App Developed & Owned by Edward Hazell",
    etc: "TensorFlow | Angular",
    cmp: true,
    bgImg: SndBxBg,
  },
  // {
  //     id: 'shopping',
  //     name: 'Shopping Component - IP',
  //     label: 'The Shopping Component is a ...',
  //     external: false,
  //     etc: 'extra stuff here',
  //     bgImg: CmngSnBg,
  // },
  // {
  //     id: 'App7',
  //     name: 'Coming Soon',
  //     label: 'App 7 was built around some lorem ipsum lorem ipsum',
  //     external: false,
  //     etc: 'extra stuff here'
  // },
  // {
  //     id: 'App8',
  //     name: 'Coming Soon',
  //     label: 'App 8 was built around some lorem ipsum lorem ipsum',
  //     external: false,
  //     etc: 'extra stuff here'
  // },
  // ,
  // {
  //     id: 'App9',
  //     name: 'Coming Soon',
  //     label: 'App 9 was built around some lorem ipsum lorem ipsum',
  //     external: false,
  //     etc: 'extra stuff here'
  // },
];

export const lftSkills = [
  {
    title: "Staff Software Engineer",
    date: "06/2023 - Present",
    location: "Softrams, Leesburg, VA",
    skills: [
      "Elevated to the position of Staff Software Engineer while successfully working in a Fully Remote capacity.",
      "Engineered multiple AWS Lambda configurations utilizing SQS, CloudWatch, and S3 to modernize and optimize outdated module functionality where applicable.",
      "Oversee the ongoing development and enhancement of five distinct application modules.",
      "Implemented Test-Driven Development (TDD) for applications using SonarQube, Jasmin, Sinon, and Chai, achieving over 85% coverage across all components and services in each module.",
      "Led team development meetings for sprint planning, JIRA task delegation, sprint delivery deadlines, while also coordinating with Business Analysts (BA), Business Owners (BO), and Project Managers (PM) for effective planning and major application releases.",
      "Facilitated communication with clients, addressing change requests, overseeing defect resolution processes, and ensuring project success through comprehensive briefing meetings.",
      "Utilized Splunk, Snyk, Storybook, and Wave 508 Compliance tools to maintain application efficiency and uphold industry standards for delivery and performance.",
      "Managed application module environment deployments and release schedules, incorporating regression testing, 508 compliance, and deploying to Production as scheduled.",
      "Facilitated interdepartmental communication, planning, and resource coordination for organization-wide deadline compliance.",
      "Developed a unified NPM for company-wide use, reducing redundant code for File Validations, Email/Template Building, and other shared functionalities across all teams.",
      "Collaborated with team members to offer mentorship and guidance, while promoting effective and proficient development standards",
    ],
  },
  {
    title: "Senior FS Software Engineer",
    date: "12/2021 - 06/2023",
    location: "Softrams, Leesburg, VA",
    skills: [
      "Worked Fully Remote as a Senior Full Stack Software Engineer.",
      "Reconstructed CMS' HPMS 20-year-old legacy system, developing Plan Benefit Package in HTML5, SCSS, Angular, TypeScript, Node, Express, and SQL within a 1.5-year delivery timeline for the complete system.",
      "Received Government Security Clearance for the development of Plan Benefit Package and any other government affiliated software.",
      "Attained SAFe 5 Practitioner certification, showcasing proficiency in Scaled Agile methodologies.",
      "Executed API-driven UI development using SQL stored JSON for streamlined component creation and maintainability.",
      "Led the design and implementation of database structures in collaboration with the DBA team.",
      "Directed application architecture, design, and development, while offering technical expertise and mentorship to junior team members.",
      "Collaborated with Business Owners (BO) to ensure adherence to appropriate development processes and UI development standards.",
      "Met tight deadlines to produce a comprehensive Data Dictionary documentation for clients.",
    ],
  },
];
export const rghtSkills = [
  {
    title: "Software Engineer",
    date: "05/2018 - 12/2021",
    location: "Topcon Healthcare Solutions, Oakland, NJ",
    skills: [
      "Worked Fully Remote as a Front End Software Engineer.",
      "Built Topcon's new web-based Ophthalmic Imaging and Diagnostic System, ‘Acquire’.",
      "Integrated, Enhanced and Maintained the Legacy Ophthalmic Imaging and Diagnostic System, “ImageNet6”.",
      "Daily engineering toolset: AngularJS, RxJS, TypeScript, JavaScript and JQuery, HTML5, and CSS3 / Sass. Using Agile methodologies including, TDD, Scrum meetings and grooming, KanBan task delegation, and daily stand ups.",
      "Maintained Jira tasks, stories, and bugs through development, testing, and delegation within a bi-weekly sprint cycle.",
      "Established Coding Standards and Code Review procedures, enhancing overall codebase quality, navigation, and reusability.",
    ],
  },
  {
    title: "Software Engineer",
    date: "01/2016 - 04/2018",
    location: "MedLabs Diagnostics, Cedar Knolls, NJ",
    skills: [],
  },
  {
    title: "IT Support Specialist",
    date: "03/2013 - 12/2015",
    location: "Laboratory Corporation of America, Raritan, NJ",
    skills: [],
  },
];
export const certsVolun = [
  {
    title: "Certified SAFe(R) 5 Practitioner",
    date: "11/2022",
    location: "Scaled Agile, Inc",
    skills: [],
  },
  {
    title: "WA State Parks",
    date: "08/2021 - Present",
    location: "Campground Volunteer Program, Washington",
    skills: [],
  },
  {
    title: "XR Immersive",
    date: "06/2018 - 06/2018",
    location: "Games for Change, New York, New York",
    skills: [],
  },
];

export const frontEnd = [
  { title: "Angular v.16", stars: 5 },
  { title: "React", stars: 3 },
  { title: "TypeScript", stars: 5 },
  { title: "JavaScript - ES6", stars: 5 },
  { title: "RxJS", stars: 5 },
  { title: "HTML5", stars: 5 },
  { title: "Sass / CSS3", stars: 5 },
  { title: "jQuery", stars: 4 },
];
export const backEnd = [
  { title: "Node.js", stars: 4 },
  { title: "Express.js", stars: 4 },
  { title: "TensorFlow", stars: 3 },
  { title: "SQL", stars: 4 },
  { title: "Oracle", stars: 4 },
  { title: "MongoDB", stars: 3 },
  { title: "ASP.NET", stars: 3 },
];
export const ifr = [
  { title: "Amazon Web Services", stars: 4 },
  { title: "Visual Studio Code", stars: 5 },
  { title: "Jira | Kanban", stars: 5 },
  { title: "GitHub | Kanban", stars: 5 },
  { title: "Confluence", stars: 4 },
  { title: "Jenkins", stars: 4 },
  { title: "Figma", stars: 3 },
  { title: "MS Active Directory", stars: 4 },
  { title: "Postman", stars: 4 },
  { title: "Splunk", stars: 4 },
  { title: "SonarQube", stars: 4 },
  { title: "Snyk", stars: 3 },
  { title: "Wave 508", stars: 4 },
  { title: "Cacher", stars: 2 },
  { title: "DBeaver", stars: 3 },
  { title: "MySQL", stars: 4 },
];
