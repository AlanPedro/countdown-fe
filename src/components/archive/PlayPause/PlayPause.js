import React from 'react';
import PropTypes from 'prop-types';

const PlayPause = ({paused, onClick}) => (
    <div className="justify-center buttons">
          <button className={`pause-btn ${paused ? "" : "playing"}`} onClick={onClick} />
    </div>
)

PlayPause.propTypes = {
    paused: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default PlayPause;