import React, { FunctionComponent } from "react";
import "./Contacts.scss";
import IconAddContact from "../../Assets/img/icon/icon-add-contact.png";

import { ContactList, Contact } from '../../types';

interface Props {
  contacts: ContactList | null;
  hasErrors: boolean;
  onClickClearDetails: () => void;
  onClickOpenDetails: () => void;
  selectedContactId?: number;
  switchSelectedContact: (contact: Contact, index: number) => void;
}

const Contacts: FunctionComponent<Props> = ({
  contacts, 
  hasErrors,
  onClickClearDetails,
  onClickOpenDetails,
  selectedContactId,
  switchSelectedContact
}) => {

  const onClickAddNewContact = (): void => {
    onClickClearDetails();
    onClickOpenDetails();
  }

  return (
    <div className="Contacts">

      <div className="Contacts-header">
        <h2 className="Contacts-header__title">Contacts</h2>
        <button 
          className='Contacts-header__btn-add'
          onClick={onClickAddNewContact}>
          <img 
            alt="Add Contact" 
            className="Contacts-header__icon-add"
            src={IconAddContact} />
        </button>        
      </div>

      <ul className='Contacts-list'>
        {contacts && contacts.length > 0 && contacts.map((contact, index) => {
          const styleActive = contact.id === selectedContactId && !hasErrors ? 'active' : '';
          const styleHasError = contact.id === selectedContactId && hasErrors ? 'color-bg-danger color-txt-primary' : '';

          return(
            <li 
              className={`${styleActive} ${styleHasError}`}
              key={contact.id}
              onClick={() => switchSelectedContact(contact, index)} >
              {contact.firstName} {contact.lastName}
            </li>
          )
        })}
      </ul>

    </div>
  );
}

export default Contacts;
