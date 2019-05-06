import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
    to: string;
}

const StyleListItem = styled.li`
    span {
        font-size: 1.4em;
    }
`;

const StyledLink = styled(Link)`
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    width: inherit;
    color: inherit;
    text-decoration: none;
    &:hover {
        color: inherit;
    }
`;

const ListItem: React.FunctionComponent<IProps> = ({children, to}) => (
    <StyleListItem>
        <StyledLink to={to}>
            {children}
        </StyledLink>
    </StyleListItem>
)


export default ListItem;