import React from 'react';
import PropTypes from 'prop-types';

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

MainCarousel.propTypes = {
  slideIndex: PropTypes.number.isRequired,
  window: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node
    ]).isRequired
  ).isRequired
}

export default MainCarousel;