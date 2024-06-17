import './alert.css';

export function Alert({ variant = 'error', children }) {
  return <div className={`mt-1 alert alert-${variant}`}>{children}</div>;
}
