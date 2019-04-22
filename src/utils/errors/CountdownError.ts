class CountdownError extends Error {

    public code: HttpErrorCodes;

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

enum HttpErrorCodes {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    CONFLICT = 409,
    GONE = 410,
    UNPROCESSABLE_ENTITY = 422
}

export default CountdownError;