import React from 'react';
import {getDayAsString, getPrettyDate} from "../../utils";

const SidebarDate = props => (
    <h3 className="date">
        {getDayAsString(props.date)}
        <br/>
        <span className="light">
            {getPrettyDate(props.date)}
          </span>
    </h3>
);

export default SidebarDate;