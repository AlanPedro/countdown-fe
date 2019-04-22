import * as React from 'react';
import styled from 'styled-components';

interface AdminListItemProps {
    id: number,
    name: string,
    time: number
}

const StyledAdminListItem = styled.div`
    background-color: transparent;
    height: 40px;
    display: grid;
    grid-template-areas: 
    "position name time"
    ;
    grid-template-columns: 1fr 5fr 1fr;
    padding-right: 10px;
    border-radius: 50px;
    text-align: left;
    color: white;
    align-items: center;
    justify-content: center;
    .name {
        grid-area: name;
    }
    .position {
        grid-area: position;
        align-self: center;
        justify-self: center;
    }
    .time {
        justify-self: center;
        align-self: center;
        grid-area: time;
    }
`;

const AdminListItem: React.FunctionComponent<AdminListItemProps> = props => (
    <StyledAdminListItem>
        <span className="position">{props.id}</span>
        <span className="name">{props.name}</span>
        <span className="time">{props.time}</span>
    </StyledAdminListItem>
);

export default AdminListItem;