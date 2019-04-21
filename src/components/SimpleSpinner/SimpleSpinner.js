import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  display: inline-block;
  width: ${props => props.size};
  height: ${props => props.size};
  border: 10px solid rgba(122, 3, 181, 0.3);
  border-radius: 50%;
  border-top-color: rgba(122,3,181,0.7);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
`;

const SimpleSpinner = props => (
    <StyledSpinner
        size={props.size || "100px"}
    />
);

export default SimpleSpinner;