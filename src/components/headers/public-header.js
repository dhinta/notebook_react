import { Link } from 'react-router-dom';

export function PublicHeader() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start px-4 py-4">
        <div className="flex flex-shrink-0 items-center">
          <Link
            to={'/'}
            className="rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page"
          >
            <img
              className="h-8 w-auto"
              src="./logo512.png"
              alt="Your Company"
            />
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <Link
              to={'/contact-us'}
              className="rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
