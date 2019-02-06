import React from 'react';
import { ICON_OFFSET_X } from '../../config/constants';

const MainCarousel = (props) => {
    const { children, slideIndex, window } = props;
    const offset = slideIndex * (window.width * ICON_OFFSET_X / 100)
    const childrenWithProps = children.map((child, index) => {
      const position = slideIndex - index
      return React.cloneElement(child, { position, offset })
    })
    return (
        <div className="main-display-wrapper">
            <div className="main-display">
              {childrenWithProps}
            </div>
        </div>
    );
}

export default MainCarousel;