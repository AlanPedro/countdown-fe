import React from 'react';
import styled from 'styled-components';

import PlayArrow from '@material-ui/icons/PlayArrowRounded';
import SkipNext from '@material-ui/icons/SkipNextRounded';
import Pause from '@material-ui/icons/PauseRounded';

const StyledAdminControls = styled.div`
    display: flex;
    font-size: 75px;
    align-items: center;
    justify-content: space-evenly;
    & > svg {
        cursor: pointer;
    }
`;

const AdminControls = ({paused, onStart, onPause, onSkip}) => (
    <StyledAdminControls>
        {
            paused ?
                <PlayArrow fontSize="inherit" onClick={onStart} />
                :
                <Pause fontSize="inherit" onClick={onPause} />
        }
        <SkipNext fontSize="inherit" onClick={onSkip} />
    </StyledAdminControls>
);

export default AdminControls;