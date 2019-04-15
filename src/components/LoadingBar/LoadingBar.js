import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import styled from 'styled-components';

const PosedLoadingBar = posed.div({
    passTime: {
        width: ({timePassed}) => `${timePassed}%`,
        transition: { ease: 'linear', duration: 1000 },
      }
});

const LoadingBarContainer = styled.div`
    width: 100%;
    height: 100%;
    
    & > div {
        height: 100%
        background: ${props => props.background ? props.background : "white"}
        background-image: ${props => props.backgroundImage ? props.backgroundImage : "none"}
    }
`;

const LoadingBar = ({allocation, timeLeft, background, backgroundImage}) => (
    <LoadingBarContainer
        background={background}
        backgroundImage={backgroundImage}
    >
        <PosedLoadingBar
            timePassed={timeLeft / allocation * 100}
            pose={"passTime"}
            poseKey={timeLeft}
            />
    </LoadingBarContainer>
);

LoadingBar.propTypes = {
    allocation: PropTypes.number.isRequired,
    timeLeft: PropTypes.number.isRequired,
    background: PropTypes.string,
    backgroundImage: PropTypes.string
};

LoadingBar.defaultProps = {
    allocation: 60,
    timeLeft: 60
};

export default LoadingBar;