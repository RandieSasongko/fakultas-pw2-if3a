import toast from 'react-hot-toast';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastIcons = {
  success: (
    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  ),
  error: (
    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  ),
  warning: (
    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
  ),
  info: (
    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
};

export const AlertService = {
  // Success Toast
  success: (title, message = '') => {
    return toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-green-500`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {ToastIcons.success}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
              {message && (
                <p className="mt-1 text-sm text-gray-500">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    ), {
      duration: 4000,
      position: 'top-right',
    });
  },

  // Error Toast
  error: (title, message = '') => {
    return toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-red-500`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {ToastIcons.error}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
              {message && (
                <p className="mt-1 text-sm text-gray-500">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-right',
    });
  },

  // Warning Toast
  warning: (title, message = '') => {
    return toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-yellow-500`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {ToastIcons.warning}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
              {message && (
                <p className="mt-1 text-sm text-gray-500">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18-6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-right',
    });
  },

  // Info Toast
  info: (title, message = '') => {
    return toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-blue-500`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {ToastIcons.info}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
              {message && (
                <p className="mt-1 text-sm text-gray-500">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    ), {
      duration: 4000,
      position: 'top-right',
    });
  },

  // Loading Toast
  loading: (title = 'Loading...') => {
    return toast.custom((t) => (
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 border-blue-500">
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {title}
              </p>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-right',
    });
  },

  // Confirm Dialog (Using browser confirm for simplicity)
  confirm: async (title, text = '', confirmText = 'Yes', cancelText = 'Cancel') => {
    return new Promise((resolve) => {
      // Create a custom modal-like element
      const userConfirmed = window.confirm(`${title}\n\n${text}`);
      resolve(userConfirmed);
    });
  },

  // Delete Confirmation
  deleteConfirm: async (itemName = 'this item') => {
    return new Promise((resolve) => {
      const userConfirmed = window.confirm(
        `Are you sure you want to delete ${itemName}?\n\nThis action cannot be undone.`
      );
      resolve({ isConfirmed: userConfirmed });
    });
  },

  // Close specific toast
  close: (toastId) => {
    toast.dismiss(toastId);
  },

  // Close all toasts
  closeAll: () => {
    toast.dismiss();
  }
};

export default AlertService;