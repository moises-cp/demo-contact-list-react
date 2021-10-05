import React, { FunctionComponent, useEffect, useState } from "react";
import "./ToastNotification.scss";
import { NotificationType } from '../../types';

const ToastMessage: FunctionComponent<NotificationType> = ({ id, message }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [toastMessages, setToastMessages] = useState<string[]>([]);

  useEffect(() => {
    if(id && message) {        
      const timeoutId = setTimeout(() => {
        setToastMessages(listOfMessages => [...listOfMessages ].filter((message, index) => {
          if(listOfMessages.length === 1) {
            setIsActive(false);
            clearTimeout(timeoutId);
          }
          return index < listOfMessages.length - 1;
        }));
      },10000); 

      setToastMessages(listOfMessages => [message, ...listOfMessages ]);
      setIsActive(true);
    } 
  },[id, message]);

  const closeToast = (): void => {
    setIsActive(false);
    setToastMessages([]);
  }

  const activeStyle = isActive ? 'active' : '';

  return (
    <div className={`toast-msg ${activeStyle}`}> 
      <div
        className='close' 
        onClick={closeToast}>
          <span>X</span>
      </div>
      <ul>
        {toastMessages.map((msg, index) => {
          return(
            <li key={index}>
              {msg}
            </li>
          )
        })}
      </ul>      
    </div>
  );
}

export default ToastMessage;
