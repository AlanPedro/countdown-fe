import React, { Component } from 'react';
import posed from 'react-pose';

const PosedMainCarousel = posed.div({
    rest: {
      x: ({offset}) => {
        return -offset;
      },
      transition: {
        transition: { ease: 'easeOut', duration: 500 }
      }
    }
  })

class MainCarousel extends Component {
    render() {
        const { children, className, slideIndex } = this.props;
        const offset = slideIndex * 1000
        return (
            <div className="main-display-wrapper">
                <PosedMainCarousel
                    initialPose={"start"}
                    offset={offset}
                    poseKey={offset}
                    pose={"rest"}
                    className="main-display"
                >
                {children}
                </PosedMainCarousel>
            </div>
        );
    }
}

export {
    SideBarCarousel,
    MainCarousel
};

