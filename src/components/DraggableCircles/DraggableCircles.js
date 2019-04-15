import React from 'react';

import './DraggableCircles.scss'

const DraggableCircles = props => {
    const styles = props.className !== undefined ? `draggable-circles ${props.className}` : `draggable-circles`;
    return (
        <div className={styles}>
            {
                Array(props.size).fill(0).map((s, i) => <span key={i} className="circle" />)
            }
        </div>
    );
};

export default DraggableCircles;