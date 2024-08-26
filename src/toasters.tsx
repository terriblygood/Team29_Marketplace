import { toast, Slide } from 'react-toastify'

export const notifyWarning = (message: string): void => {
  toast.warn(message, {
    position: 'top-center',
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Slide,
  })
}

export const notifySuccess = (message: string): void => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Slide,
  })
}