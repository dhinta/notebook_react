import './loader.css';

export const LoaderSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export function Loader({ size = LoaderSize.MEDIUM }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin mr-3 loader ${size}`}
        viewBox="0 0 24 24"
      ></div>
    </div>
  );
}
