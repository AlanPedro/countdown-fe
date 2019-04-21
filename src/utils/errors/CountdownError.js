class CountdownError extends Error {
    constructor(code = 0, message = "") {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super();

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CountdownError);
        }

        this.name = 'CountdownError';
        // Custom debugging information
        this.code = code;
        this.message = message;
    }
}

export default CountdownError;