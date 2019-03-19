import React from 'react';
import { Link } from 'react-router-dom';
import RoundButton  from '../RoundButton/RoundButton';

const BackButton = props => (
    <Link to={props.to} className={props.className}>
      <RoundButton>
          Go back
      </RoundButton>
    </Link>
  )

export default BackButton;