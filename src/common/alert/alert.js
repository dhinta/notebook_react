import './alert.css';

export function Alert({ variant = 'error', children, ...props }) {
  return (
    <div className={`mt-1 alert alert-${variant} ${props.className}`}>
      {children}
    </div>
  );
}
