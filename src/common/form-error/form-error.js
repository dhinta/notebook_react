import { ErrorMessage } from 'formik';
import './form-error.css';

export function FormError({ variant = 'error', ...props }) {
  return <ErrorMessage {...props} className={`mt-1 alert alert-${variant}`} />;
}
