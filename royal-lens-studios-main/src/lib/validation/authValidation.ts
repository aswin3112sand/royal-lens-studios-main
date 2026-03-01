export interface AuthFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type AuthField = keyof AuthFormValues;
export type AuthFieldErrors = Partial<Record<AuthField, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateAuthForm = (values: AuthFormValues, isLogin: boolean): AuthFieldErrors => {
  const errors: AuthFieldErrors = {};

  if (!isLogin) {
    const fullName = values.fullName.trim();
    if (!fullName) {
      errors.fullName = "Full name is required.";
    } else if (fullName.length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    }
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!isLogin) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  return errors;
};

export const hasAuthErrors = (errors: AuthFieldErrors) => Object.keys(errors).length > 0;
