import React from 'react'
import {ToastContainer} from 'react-toastify';

const Notification = () => (
    <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
  />
)


const NotificationSuccess = ({ text }) => (
    <div>
      <i className="bi bi-check-circle-fill text-success mx-2" />
      <span className="text-secondary mx-1">{text}</span>
    </div>
  );
  
  const NotificationError = ({ text }) => (
    <div>
      <i className="bi bi-x-circle-fill text-danger mx-2" />
      <span className="text-secondary mx-1">{text}</span>
    </div>
  );




export { Notification, NotificationSuccess, NotificationError };
