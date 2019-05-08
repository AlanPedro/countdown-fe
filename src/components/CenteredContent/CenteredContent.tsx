import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

interface IProps {
    children: React.ReactNode;
    title: string;
}

const CenteredContentContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContentWrapper = styled.div`
    width: 80%;
    max-width: 850px;
    display: inherit;
    flex-direction: inherit;
`;

const CenteredContent: React.FunctionComponent<IProps> = props => (
    <CenteredContentContainer>
        <ContentWrapper>
            <Typography variant="h2" style={{ marginBottom: "20px"}}> 
                {props.title}
             </Typography>
            {props.children}
        </ContentWrapper>
    </CenteredContentContainer>
)

export default CenteredContent;