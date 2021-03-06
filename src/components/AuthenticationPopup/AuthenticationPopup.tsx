import * as React from 'react';
import Typography from "@material-ui/core/es/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popup from "../Popup/Popup";

interface AuthenticationPopupProps {
    show: boolean;
    onAuthentication: () => void;
}

const AuthenticationPopup: React.FunctionComponent<AuthenticationPopupProps> = ({ show, onAuthentication}) => {

    const [password, setPassword] = React.useState("");
    const [showError, setShowError] = React.useState(false);

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.toUpperCase() === "ADMIN") {
            setShowError(false);
            onAuthentication();
        } else {
            setShowError(true);
        }
    };

    return (
        <Popup show={show}>
            <Typography variant="h6" style={{ marginTop: '0'}}>
                Sign in for admin panel access
            </Typography>

            <form onSubmit={signIn} style={{ display: "inherit", flexDirection: "inherit"}}>
                <TextField
                    error={showError}
                    id="admin-password"
                    label="Enter password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    helperText={showError ? "Wrong password, try again" : ""}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained">Sign In</Button>
            </form>
        </Popup>
    )
};

export default AuthenticationPopup;