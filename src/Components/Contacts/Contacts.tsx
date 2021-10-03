import React, { FunctionComponent } from "react";
import "./Contacts.scss";
import IconAddContact from "../../Assets/img/icon/add-icon.svg";

import { ContactList, Contact } from '../../types';

interface Props {
  contacts: ContactList | null;
  onClickClearDetails: () => void;
  onClickOpenDetails: () => void;
  selectedContactId?: number;
  switchSelectedContact: (contact: Contact, index: number) => void;
}

const Contacts: FunctionComponent<Props> = ({
  contacts, 
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
        {contacts && contacts.length && contacts.map((contact, index) => {
          const className = contact.id === selectedContactId ? 'active' : '';

          return(
            <li 
              className={className}
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
