import React, {
  FunctionComponent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import './Details.scss';
import IconAdd from '../../Assets/img/icon/icon-add-contact.png';
import IconDeleteInputField from '../../Assets/img/icon/icon-delete.svg';
import { Contact } from '../types';
import { fieldsConfig } from '../config';

interface Props {
  hasErrors: boolean;
  isEdited: boolean;
  isOpenDetails: boolean;
  selectedContact: Contact | null;
  onClickCancel: () => void;
  onClickDeleteContact: () => void;
  onClickDeleteEmail: (emailToRemove: string) => void;
  onClickAddEmail: (email: string) => void;
  saveContact: () => void;
  updateFirstName: (firstName: string) => void;
  updateLastName: (lastName: string) => void;
}

const Details: FunctionComponent<Props> = ({
  hasErrors,
  isEdited,
  isOpenDetails,
  onClickAddEmail,
  onClickCancel,
  onClickDeleteContact,
  onClickDeleteEmail,
  updateFirstName,
  saveContact,
  selectedContact,
  updateLastName,
}) => {
  const [displayFirstNameMessage, setDisplayFirstNameMessage] =
    useState<boolean>(false);
  const [displayLastNameMessage, setDisplayLastNameMessage] =
    useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isCreatingEmail, setIsCreatingEmail] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string | null>(null);

  useEffect(() => {
    setIsCreatingEmail(false);
  }, [selectedContact]);

  /**
   * Input Fields
   */
  const onChangeEditFirstName = (event: FormEvent<HTMLInputElement>): void => {
    const firstName = event.currentTarget.value.trim();
    updateFirstName(firstName);

    if (fieldsConfig.firstName.regex.test(firstName)) {
      setDisplayFirstNameMessage(false);
    } else {
      setDisplayFirstNameMessage(true);
    }
  };

  const onChangeEditLastName = (event: FormEvent<HTMLInputElement>): void => {
    const lastName = event.currentTarget.value;
    updateLastName(lastName);

    if (fieldsConfig.lastName.regex.test(lastName)) {
      setDisplayLastNameMessage(false);
    } else {
      setDisplayLastNameMessage(true);
    }
  };

  // Email
  const toogleEmailInputField = (): void => {
    if (isEmailValid && newEmail) {
      onClickAddEmail(newEmail);
      setNewEmail(null);
      setIsCreatingEmail(!isCreatingEmail);
      setIsEmailValid(false);
      return;
    }

    if (!newEmail) {
      setIsCreatingEmail(!isCreatingEmail);
    }
  };

  const onClickCloseEmailInputField = (): void => {
    setIsEmailValid(false);
    setNewEmail(null);
    setIsCreatingEmail(!isCreatingEmail);
  };

  const validateEmail = (event: FormEvent<HTMLInputElement>): void => {
    const email = event.currentTarget.value.trim();

    if (fieldsConfig.email.regex.test(email)) {
      setIsEmailValid(true);
      setNewEmail(email);
      fieldsConfig.email.hasError = false;
      return;
    }

    if (isEmailValid === true) {
      setIsEmailValid(false);
      fieldsConfig.email.hasError = true;
    }
  };

  /**
   * Control Buttons
   */
  const onCancel = (): void => {
    setDisplayFirstNameMessage(false);
    setIsCreatingEmail(false);
    setDisplayLastNameMessage(false);
    setNewEmail(null);
    onClickCancel();
  };

  /**
   * Computed Variables
   */
  const isBtnSaveDisabled =
    (isEdited && hasErrors) || (!isEdited && !hasErrors);
  const styleClassIconAddEmail =
    isCreatingEmail && !isEmailValid ? 'color-disabled' : '';
  const btnCancelAndDeleteDisabledStyles = selectedContact?.firstName
    ? ''
    : 'color-disabled';
  const StyleAvailabilitydisabledButton = isBtnSaveDisabled
    ? 'color-disabled'
    : '';
  const showDetails = isOpenDetails ? 'Details__mobile-active' : '';
  const isWithinEmailTotalLimit =
    selectedContact && selectedContact.emails.length < 5;

  return (
    <div className={`Details ${showDetails}`}>
      <div>
        <button
          className="Details__btn-go-back btn-clear mar-none text-color-subtle"
          onClick={onCancel}
        >
          &larr; Go Back
        </button>
        <div className="Details-fields">
          <div>
            <label>
              First Name
              <input
                name="firstname"
                onChange={onChangeEditFirstName}
                type="text"
                value={selectedContact?.firstName ?? ''}
              />
            </label>

            {displayFirstNameMessage && (
              <ul className="input-msg">
                {fieldsConfig.firstName.msg.map((message) => {
                  return <li>{message}</li>;
                })}
              </ul>
            )}
          </div>

          <div>
            <label>
              Last Name
              <input
                name="lastname"
                onChange={onChangeEditLastName}
                type="text"
                value={selectedContact?.lastName ?? ''}
              />
            </label>

            {displayLastNameMessage && (
              <ul className="input-msg">
                {fieldsConfig.lastName.msg.map((message) => {
                  return <li>{message}</li>;
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="Details-fields__emails">
          <div className="Details-fields__emails-add-container">
            <label>Emails</label>

            {selectedContact?.emails &&
              selectedContact.emails.map((email, index) => {
                return (
                  <div
                    className="align-items-center btn-inner-visible-hover mt-md-1 sp-md-between"
                    key={index}
                  >
                    <a href={`mailto:${email}`}>{email} </a>
                    <button
                      className="btn-transparent"
                      onClick={() => onClickDeleteEmail(email)}
                    >
                      <img
                        alt="Delete Email"
                        className="icon icon-sm"
                        src={IconDeleteInputField}
                      />
                    </button>
                  </div>
                );
              })}

            <div className="Details__add-email my-sm">
              {isCreatingEmail && (
                <input
                  className="Details__add-email-input"
                  onKeyUp={validateEmail}
                  type="email"
                />
              )}

              {isWithinEmailTotalLimit && (
                <button
                  className="btn-transparent"
                  disabled={isCreatingEmail && !isEmailValid}
                  onClick={toogleEmailInputField}
                >
                  <img
                    src={IconAdd}
                    alt="Add Email"
                    className={`Details-fields__emails-btn-add icon ${styleClassIconAddEmail}`}
                  />
                </button>
              )}

              {isCreatingEmail && (
                <img
                  alt="Delete Email"
                  className="icon icon-md"
                  onClick={onClickCloseEmailInputField}
                  src={IconDeleteInputField}
                />
              )}

              {!isCreatingEmail && isWithinEmailTotalLimit && (
                <div>
                  <span onClick={toogleEmailInputField}>Add Email</span>
                </div>
              )}

              {isCreatingEmail && !isEmailValid && (
                <ul className="input-msg">
                  {fieldsConfig.email.msg.map((message, index) => {
                    return <li key={index}>{message}</li>;
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="Details-controllers">
          <button
            className={`Details-controllers__btn-delete ${btnCancelAndDeleteDisabledStyles}`}
            disabled={!selectedContact?.firstName}
            onClick={onClickDeleteContact}
          >
            Delete
          </button>

          <div>
            <button
              className={`Details-controllers__btn-cancel ${btnCancelAndDeleteDisabledStyles}`}
              disabled={!selectedContact?.firstName}
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className={`Details-controllers__btn-save ${StyleAvailabilitydisabledButton}`}
              disabled={isBtnSaveDisabled}
              onClick={saveContact}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
