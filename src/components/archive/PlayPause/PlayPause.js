import React from 'react';

const PlayPause = ({paused, onClick}) => (
    <div className="justify-center buttons">
          <button className={`pause-btn ${paused ? "" : "playing"}`} onClick={onClick} />
    </div>
)

export default PlayPause;