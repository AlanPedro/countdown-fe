import * as React from 'react';
import styled from 'styled-components';

const StyledDraggableCircles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  span.circle {
    height: 6px;
    width: 6px;
    background-color: #e0e0e0;
    border-color: #e0e0e0;
    border-width: 4px;
  }
`;

interface DraggableCirclesProps {
    size: number;
}

const DraggableCircles: React.FunctionComponent<DraggableCirclesProps> = props => (
    <StyledDraggableCircles>
        {
            Array.apply(null, new Array(props.size)).map((s, i) =>
                <span key={i} className="circle" />
            )
        }
    </StyledDraggableCircles>
);

export default DraggableCircles;