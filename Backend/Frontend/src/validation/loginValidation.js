import { handleError } from "../components/Toaster";

export const Validation = (values) => {
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (values.email === "") {
    handleError("email is required");
    return false;
  } else if (!email_pattern.test(values.email)) {
    handleError("This is not a valid format");
    return false;
  }

  if (values.password === "") {
    handleError("password is required");
    return false;
  } else if (values.password.length < 4) {
    handleError("password length must be at least 4 characters long");
    return false;
  }

  return true;
};
