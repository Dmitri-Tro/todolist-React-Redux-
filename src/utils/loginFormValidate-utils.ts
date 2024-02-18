type FormValues = {
    email: string;
    password: string;
    rememberMe: Boolean;
};

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};

export const validate = (values: FormValues) => {
    const errors: FormikErrorType = {};
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 4) {
        errors.password = "Length must be 4 symbols or more";
    }
    return errors;
};