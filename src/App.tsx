import React, { useState } from "react";
import Contacts from "./Components/Contacts/Contacts";
import Details from "./Components/Details/Details";
import ToastNotification from './Components/ToastNotification/ToastNotification';
import AlertNotification from './Components/AlertNotification/AlertNotification';
import "./App.scss";
import { ContactList, Contact, NotificationType } from './types';
import { toUpperFirstLetter, getObjectCopy, getUniqueId, sortObjectByFirstNameAsc } from "./util";
import { fieldsConfig } from './config';

import IconPeople from './Assets/img/icon/people-icon-contacts-alpha-50x36.png';
import { defaultContactList } from './Data/defaultContacts';

const emptyContactTemplate = {
  id: getUniqueId(),
  firstName: '',
  lastName: '',
  emails: []
}

const detailsSlideDelay = 700;
const viewportWidthMobile = 767;

const App = () => {

  /**
   * State
   */
  const [contacts, setcontacts] = useState<ContactList | null>(sortObjectByFirstNameAsc(defaultContactList));
  const [selectedContact, setSelectedContact] = useState<Contact | null>(getObjectCopy(emptyContactTemplate));
  const [selectedContactIndex, setSelectedContactIndex] = useState<number | null>(null);
  // Toast Notification
  const [toastNotification, setToastNotification] = useState<NotificationType | null>(null);  
  // Validation
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  // Details Window
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);
  // Alert Notification Componenet  
  const [alertIsVisible, setAlertIsVisible] = useState<boolean>(false);
  const [alertQuestion, setAlertQuestion] = useState<string>('');
  const [alertProceedFunctions, setAlertProceedFunctions] = useState<any>();


  /**
   * Contact list
   */
   const switchSelectedContact = (contact: Contact, index: number): void => {
    setSelectedContact(contact);
    setSelectedContactIndex(index);
    setIsEdited(false);
    setIsOpenDetails(true);
  }
  
  /**
   * Handle Contact Detail Buttons
   */
  const clearDetails = () => {
    setIsOpenDetails(false);    

    if(window.innerWidth <= viewportWidthMobile) {
      setTimeout(() => {      
        removeSelectedContact();
      }, detailsSlideDelay);
    } else {
      removeSelectedContact();
    }    
  }

  const setAlert = (questionForUser: string, func: Function): any => {
    setAlertProceedFunctions({
      closeModal: setAlertIsVisible(false),
      functionToExecute: func
    });
    setAlertQuestion(questionForUser);
    setAlertIsVisible(true);
  }

  const deleteSelectedContact = () => {
    const fullName = `${selectedContact?.firstName} ${selectedContact?.lastName}`;

    if(contacts && selectedContact && selectedContactIndex !== null) {
      setIsOpenDetails(false);
      if(window.innerWidth <= viewportWidthMobile) {
        setTimeout(() => {
          const newContactList = [ ...contacts ];
          newContactList.splice(selectedContactIndex, 1);
          setcontacts(newContactList);  
          setSelectedContact(null);
          setToastNotification({
              id: getUniqueId(), 
              message: `${fullName} has been removed from your contacts.`
          });
        }, detailsSlideDelay);
      } else {
        const newContactList = [ ...contacts ];
        newContactList.splice(selectedContactIndex, 1);
        setcontacts(newContactList);    
        setSelectedContact(null);
        setToastNotification({
            id: getUniqueId(), 
            message: `${fullName} has been removed from your contacts.`
        });
      }
    }
  }

  const onClickDeleteSelectedContact = (): void => {   
    const contactName = `${selectedContact?.firstName} ${selectedContact?.lastName}`;  
    setAlert(
      `Are you sure you want to remove ${contactName} from your contacts?`,
      deleteSelectedContact
    );
  }

  const removeSelectedContact = (): void => {
    setSelectedContact(getObjectCopy(emptyContactTemplate));
    setSelectedContactIndex(null);
    setIsEdited(false); 
  }

  const saveContact = (): void => {
    const newContact = { ...selectedContact } as Contact; 

    if(!contacts && isEdited && !hasError) {
      addNewContactToEmptyList(newContact);
      return;
    }    

    if(selectedContactIndex !== null && isEdited && !hasError) {
      updateExistingContact(newContact);
      return;
    }

    if(isEdited && !hasError) {
      addNewContactToPopulatedList(newContact);
      return;
    }

    updateToastMessage('Contact was not saved.');
  } 

  /**
   * Handle Input Fields Updates
   */
   const addEmailToContact = (emailToAdd: string): void => {
    const contact = { ...selectedContact } as Contact;
    const isEmailTaken = contact.emails.some(contactEmail => contactEmail === emailToAdd);

    if(isEmailTaken) {
      return;
    }  
    
    contact.emails.push(emailToAdd);
    setSelectedContact(contact);
    setIsEdited(true);
    verifyEditingErrors(contact);
  }  

  const deleteContactEmail = (emailToRemove: string): void => {
    const contact = { ...selectedContact } as Contact; 
    contact.emails = contact.emails && contact.emails.filter(email => email !== emailToRemove);
    setSelectedContact(contact);
    setIsEdited(true);
    updateToastMessage(`${emailToRemove} has been removed temporarily. To make this a permanent change, press the Save button.`);
  }

  const handleFirstNameUpdate = (firstName: string): void => {
    const contact = { ...selectedContact } as Contact; 
    contact.firstName = toUpperFirstLetter(firstName);
    updateEditingStatus(contact);
    setSelectedContact(contact);
    verifyEditingErrors(contact);
  }

  const handleLastNameUpdate = (lastName: string): void => {
    const contact = { ...selectedContact } as Contact; 
    contact.lastName = toUpperFirstLetter(lastName);
    updateEditingStatus(contact);
    setSelectedContact(contact);
    verifyEditingErrors(contact);
  }


  /**
   * Helpers Functions
   */
  const onClickOpenDetails = (): void => {
    setIsOpenDetails(true);
  }
  
  const updateContactList = (contactList: ContactList): void => {
    setcontacts(contactList);
    setIsEdited(false);
  }

  const updateEditingStatus = (contact: Contact): void => {
    if(contacts && selectedContactIndex !== null) {
      JSON.stringify(contact).toLowerCase() === JSON.stringify(contacts[selectedContactIndex]).toLowerCase()
      ? setIsEdited(false)
      : setIsEdited(true);
    } else {
      setIsEdited(true);
    }
  }

  const verifyEditingErrors = (contact: Contact): void => {
    let hasErrors = false;
    let errorMessages: string[] = [];

    if(selectedContact !== null  && 
      !fieldsConfig.firstName.regex.test(contact.firstName)) {  
        if(selectedContactIndex !== null) {
          errorMessages.push('First name is not valid.');
        }        
      hasErrors = true;
    } 

    if(selectedContact !== null  && 
      !fieldsConfig.lastName.regex.test(contact.lastName)) {  
        if(selectedContactIndex !== null) {
          errorMessages.push('Last name is not valid.');
        }        
        hasErrors = true;
    } 

    contact.emails.forEach(email => {
      if(!fieldsConfig.email.regex.test(email)) {
        if(selectedContactIndex !== null) {
          errorMessages.push(`"${email}" is not valid.`);
        }        
        hasErrors = true;
      }
    });

    if(hasErrors) {
      updateToastMessage(errorMessages.join(' '));
    }    

    setHasError(hasErrors);
  }

  // Create/Update Contact
  const addNewContactToPopulatedList = (newContact: Contact):void => {
    const contactList: Contact[] = contacts ? getObjectCopy(contacts) : [];
    const index = contacts ? contacts.length : 0;
    newContact.id = getUniqueId();
    contactList.push(newContact);

    updateContactList(sortObjectByFirstNameAsc(contactList));    
    switchSelectedContact(newContact, index);
    updateToastMessage(`${newContact.firstName} ${newContact.lastName} has been added to your contacts.`);
  }

  const addNewContactToEmptyList = (newContact: Contact):void => {
    newContact.id = getUniqueId();

    updateContactList(sortObjectByFirstNameAsc([newContact]));
    switchSelectedContact(newContact, 0);
    updateToastMessage(`${newContact.firstName} ${newContact.lastName} has been added to your contacts.`);
  }

  const updateExistingContact = (newContact: Contact): void => {
    const contactList: Contact[] = contacts ? [...contacts] : [];

    if(selectedContactIndex !== null) {
      contactList[selectedContactIndex] = {...newContact};
      updateContactList(contactList);
      updateToastMessage(`${newContact.firstName} ${newContact.lastName} has been updated.`);
    }
  }

  const updateToastMessage = (message: string): void => {
    setToastNotification({
      id: getUniqueId(),
      message: message
    });
  }

  // Alert Notifications
  const closeAlert = () => {
    setAlertIsVisible(false);
  }

  return (
    <div className="App">
      <header>
        <h1 className={hasError ? 'color-bg-danger' : ''}>
          <div>
            <img src={IconPeople} alt='Icon of People' />
            Moisés Contacts
          </div>          
        </h1>        
      </header>
      <main>
        <Contacts 
          contacts={contacts} 
          hasErrors={hasError}
          onClickClearDetails={clearDetails}
          onClickOpenDetails={onClickOpenDetails}
          selectedContactId={selectedContact?.id}
          switchSelectedContact={switchSelectedContact}
        />
        <Details  
          hasErrors={hasError}
          isEdited={isEdited}
          isOpenDetails={isOpenDetails}
          onClickAddEmail={addEmailToContact}
          onClickCancel={clearDetails}
          onClickDeleteContact={onClickDeleteSelectedContact}
          onClickDeleteEmail={deleteContactEmail} 
          saveContact={saveContact}
          selectedContact={selectedContact}
          updateFirstName={handleFirstNameUpdate}
          updateLastName={handleLastNameUpdate}
          />
        <ToastNotification 
          id={toastNotification ? toastNotification.id : 0}
          message={toastNotification ? toastNotification.message : ''}
        />
        {alertIsVisible &&
          <AlertNotification 
            closeAlert={closeAlert}
            questionForUser={alertQuestion}
            proceedFuntions={alertProceedFunctions}
          />
        }
      </main>
    </div>
  );
};

export default App;
