import React from 'react';
import ListItem from '../ListItem/ListItem';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
}

const StyledList = styled.ul`
    width: 100%
    padding-inline-start: 0;

    li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid grey;
        padding: 5px 15px;

        &:last-of-type {
            border-bottom: 1px solid grey;
        }

        &:hover {
            cursor: pointer;
            background: purple;
            color: white;
        }
    }
`;

const CountdownList: React.FunctionComponent<IProps> = ({children}) => {

    return (
        <StyledList>
            {children}
        </StyledList>
    )
}

export default CountdownList;