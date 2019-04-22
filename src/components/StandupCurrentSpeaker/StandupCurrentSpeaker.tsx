import React from 'react';
import styled from 'styled-components';
import Typography from "@material-ui/core/es/Typography";
import RandomAvatar from "../RandomAvatar/RandomAvatar";
import Timer from "../Timer/Timer";

const SpeakerContainer = styled.div`
    position: relative;
    grid-area: speaker;
    background: white;
    margin: 0 10vw;
    border-radius: 20px;
    box-shadow: -1px 0px 15px 5px #aaaaaa;
    text-align: center;
    padding: 50px 15px 15px;
    display: grid;
    grid-template-rows: 70px 70px 1fr;
    
    & .time-left {
        justify-content: center;
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        
        .timer {
            background-color: rgba(255, 0, 0, 0.8);
            padding: 0 100px;
            border-radius: 10px;
            font-size: 3em;
        }
    }
`;

const renderTimer = (time: number) => time <= 10 ? <Timer time={time} /> : null;

interface IProps {
    speaker: string;
    team: string;
    time: number;
    number: number;
}

const StandupCurrentSpeaker:React.FunctionComponent<IProps> = ({speaker, team, time, number}) => (
    <SpeakerContainer>
        <Typography variant="h3">{speaker}</Typography>
        <Typography variant="h4" color="textSecondary">{team}</Typography>
        <RandomAvatar height="70%" style={{alignSelf: "center", justifySelf: "center"}} number={number} />
        <div className="time-left">
            {renderTimer(time)}
        </div>
    </SpeakerContainer>
);

export default StandupCurrentSpeaker;