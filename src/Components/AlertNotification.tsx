import React, { FunctionComponent } from 'react';
import './AlertNotification.scss';

interface Props {
  closeAlert: () => void;
  questionForUser: string;
  proceedFuntions: { closeModal: () => void; functionToExecute: Function };
}

const AlertNotification: FunctionComponent<Props> = ({
  closeAlert,
  questionForUser,
  proceedFuntions,
}) => {
  const proceed = () => {
    proceedFuntions.functionToExecute();
    closeAlert();
  };

  return (
    <div className="alertnotf">
      <div className="alertnotf__content">
        <div className="alertnotf__content-question">{questionForUser}</div>
        <div className="alertnotf__content-controllers">
          <button className="btn-danger" onClick={proceed}>
            Yes
          </button>
          <button className="btn-regular" onClick={closeAlert}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;
