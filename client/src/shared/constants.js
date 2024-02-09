import Logon from "../components/body/portfolio-component/projects/logon/logon";
import logBg from '../components/body/portfolio-component/assets/LogonAppImg.webp';

export const navBarOptions = [
    {
        type: 'About',
        to: 'about'
    },
    {
        type: 'Resume',
        to: 'resume'
    },
    {
        type: 'Portfolio',
        to: 'portfolio'
    },
    {
        type: 'Contact',
        to: 'contact'
    }
];

// external EXAMPLE
// {
//     id: 'App1',
//     name: 'DEEHV - IP',
//     label: 'Deehv is a sandbox for development by Edward Hazell',
//     external: "https://deehv-94b3d7c81638.herokuapp.com/",
//     title: "Web App Developed by Edward Hazell",
//     etc: 'Angular'
// },
export const portfolioOptions = [
    {
        id: 'Logon',
        name: 'Logon Component',
        label: 'A basic logon component for logging in, or registering if unregistered.',
        title: "Logon Component Developed by Edward Hazell",
        etc: 'React',
        bgImg: logBg,
        cmp: <Logon />
    },
    {
        id: 'App2',
        name: 'Test React App',
        label: 'Test React App is a test app for loading components',
        external: false,
        etc: 'React'
    },
    {
        id: 'App3',
        name: 'App 3',
        label: 'App 3 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App4',
        name: 'App 4',
        label: 'App 4 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App5',
        name: 'App 5',
        label: 'App 5 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App6',
        name: 'App 6',
        label: 'App 6 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App7',
        name: 'App 7',
        label: 'App 7 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App8',
        name: 'App 8',
        label: 'App 8 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App9',
        name: 'App 9',
        label: 'App 9 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App10',
        name: 'App 10',
        label: 'App 10 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App11',
        name: 'App 11',
        label: 'App 11 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App12',
        name: 'App 12',
        label: 'App 12 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App13',
        name: 'App 13',
        label: 'App 10 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App14',
        name: 'App 14',
        label: 'App 14 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    },
    {
        id: 'App15',
        name: 'App 15',
        label: 'App 15 was built around some lorem ipsum lorem ipsum',
        external: false,
        etc: 'extra stuff here'
    }
];

export const lftSkills = [
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
export const rghtSkills = [
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
export const certsVolun = [
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

export const frontEnd = [
    { title: 'Angular v.16', stars: 5 },
    { title: 'React', stars: 3 },
    { title: 'TypeScript', stars: 5 },
    { title: 'JavaScript - ES6', stars: 5 },
    { title: 'RxJS', stars: 5 },
    { title: 'HTML5', stars: 5 },
    { title: 'Sass / CSS3', stars: 5 },
    { title: 'jQuery', stars: 4 },
];
export const backEnd = [
    { title: 'Node.js', stars: 4 },
    { title: 'Express.js', stars: 4 },
    { title: 'SQL', stars: 4 },
    { title: 'Oracle', stars: 4 },
    { title: 'MongoDB', stars: 3 },
    { title: 'ASP.NET', stars: 3 },
];
export const ifr = [
    { title: 'Amazon Web Services', stars: 4 },
    { title: 'Visual Studio Code', stars: 5 },
    { title: 'Jira | Kanban', stars: 5 },
    { title: 'GitHub | Kanban', stars: 5 },
    { title: 'Confluence', stars: 4 },
    { title: 'Jenkins', stars: 4 },
    { title: 'Figma', stars: 3 },
    { title: 'MS Active Directory', stars: 4 },
    { title: 'Postman', stars: 4 },
    { title: 'Splunk', stars: 4 },
    { title: 'SonarQube', stars: 4 },
    { title: 'Snyk', stars: 3 },
    { title: 'Wave 508', stars: 4 },
    { title: 'Cacher', stars: 2 },
    { title: 'DBeaver', stars: 3 },
    { title: 'MySQL', stars: 4 },
];