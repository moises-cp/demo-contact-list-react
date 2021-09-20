import React, { FunctionComponent, useEffect, useState } from "react";
import "./ToastNotification.scss";

interface Props {
  message: string | null;
}

const ToastMessage: FunctionComponent<Props> = ({message}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [toastMessages, setToastMessages] = useState<string[]>([]);

  useEffect(() => {
    if(message) {        
      setTimeout(() => {
        setToastMessages(listOfMessages => [...listOfMessages ].filter((message, index) => {
          if(listOfMessages.length === 1) {
            setIsActive(false);
          }
          return index < listOfMessages.length - 1;
        }));
      },10000);      

      setToastMessages(listOfMessages => [message, ...listOfMessages ]);
      setIsActive(true);
    } 
  },[message]);

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
