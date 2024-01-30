import styled from 'styled-components';

export const TheBody = styled.div`
    display: grid;
    grid-auto-rows: 100vh;
    grid-template-columns: 1fr;
    overflow-y: hidden;
    overflow-x: hidden;
`;

export const BodyPart = styled.div`
    height: 88vh;
    margin-top: 12vh;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    
    border-radius: 5%;
    &.fs{
        margin-top: 0vh;
        height: 100vh;
    }
`;

// background: linear-gradient(355deg, rgba(2,0,36,0.75) 0%, rgba(9,9,121,0.75) 35%, rgba(0,212,255,0.75) 100%);
export const BodyPane = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-Flow: column;
`;

export const TextHolder = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;

    height: 80%;
    border-radius: 12px;
    overflow-y: auto;
    overflow-x: hidden;

    color: white;
    line-height: 1.25em;
    font-size: min(3vw, 30px);    

    background-color: rgba(38, 205, 242,0.92);
`;