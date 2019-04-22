import * as React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import {PoseElementProps} from "react-pose/lib/components/PoseElement/types";

type PosedLoadingBarProps = {
    timePassed: number;
}

const PosedLoadingBar: React.ComponentType<PoseElementProps & React.HTMLProps<any>> = posed.div({
    passTime: {
        width: (props: PosedLoadingBarProps) => `${props.timePassed}%`,
        transition: { ease: 'linear', duration: 1000 },
      }
});

const LoadingBarContainer = styled.div`
    width: 100%;
    height: 100%;
    & > div {
        height: 100%
        background: ${(props: LoadingBarContainerProps) => props.background ? props.background : "white"}
        background-image: ${(props: LoadingBarContainerProps) => props.backgroundImage ? props.backgroundImage : "none"}
    }
`;

interface LoadingBarContainerProps {
    background?: string;
    backgroundImage?: string;
    children: React.ReactNode;
}

interface LoadingBarProps {
    allocation: number;
    timeLeft: number;
    background?: string;
    backgroundImage?: string;
    className?: string;
}

const LoadingBar: React.FunctionComponent<LoadingBarProps> = ({allocation, timeLeft, background, backgroundImage, className}) => (
    <LoadingBarContainer
        background={background}
        backgroundImage={backgroundImage}
    >
        <PosedLoadingBar
            className={className}
            timePassed={timeLeft / allocation * 100}
            pose={"passTime"}
            poseKey={timeLeft}
            />
    </LoadingBarContainer>
);

LoadingBar.defaultProps = {
    allocation: 60,
    timeLeft: 60
};

export default LoadingBar;