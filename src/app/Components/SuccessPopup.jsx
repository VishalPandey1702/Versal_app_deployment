import { toast, ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export function successToast(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  })
}

export function failToast(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
  })
}

export function Popup() {
  return <ToastContainer />
}
