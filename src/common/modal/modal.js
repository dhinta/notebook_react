import { createPortal } from 'react-dom';

export function Modal({ children, open, onClose, title = '' }) {
  const modalContainer = (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div
              className="absolute top-0 right-0 cursor-pointer px-2 py-1"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="bg-white pb-4 pt-5 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:text-left">
                {title && (
                  <h2
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h2>
                )}
                <div className="px-4 sm:p-6">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return open
    ? createPortal(modalContainer, document.querySelector('#modal-root'))
    : null;
}
