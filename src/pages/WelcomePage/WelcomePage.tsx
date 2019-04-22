import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";

const WelcomePage: React.FunctionComponent = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%' }}>

            <Typography variant="h2"> Welcome to Countdown! </Typography>

        </div>
    )
};

export default WelcomePage;