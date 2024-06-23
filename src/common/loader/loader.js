import './loader.css';

export const LoaderSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export function Loader({ size = LoaderSize.MEDIUM }) {
  console.log(size);
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={`animate-spin mr-3 loader ${size}`}
        viewBox="0 0 24 24"
      ></div>
    </div>
  );
}
