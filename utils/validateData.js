import validator from "validator";

export const validateEmail = (data) => {
    return validator.isEmail(data);
};

export const checkPassword = (password) => {
    return validator.isStrongPassword(password);
};

export const comparePassword = (password, confirmPassword) => {
    return validator.equals(password, confirmPassword);
};
