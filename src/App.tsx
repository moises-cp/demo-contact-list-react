import React, { useState } from "react";
import Contacts from "./Components/Contacts/Contacts";
import Details from "./Components/Details/Details";
import ToastNotification from './Components/ToastNotification/ToastNotification';
import AlertNotification from './Components/AlertNotification/AlertNotification';
import "./App.scss";
import { ContactList, Contact, NotificationType } from './types';
import { getUniqueId } from "./util";
import { getObjectCopy } from "./util";
import { fieldsConfig } from './config';

import IconPeople from './Assets/img/icon/icon-people-contacts50x43-90-min.jpg';

const emptyContactTemplate = {
  id: getUniqueId(),
  firstName: '',
  lastName: '',
  emails: []
}

const detailsSlideDelay = 700;

const App = () => {

  /**
   * State
   */
  // Contact / Contacts
  const [contacts, setcontacts] = useState<ContactList | null>([
    {
      id: getUniqueId(),
      firstName: 'Jessica',
      lastName: 'Alba',
      emails: [
        'alba@jessica.com',
        'alba2@jessica2.com',
      ]
    },
    {
      id: getUniqueId(),
      firstName: 'Will',
      lastName: 'Smith',
      emails: [
        'smith@will.com',
        'smith2@will2.com',
      ]
    },
    {
      id: getUniqueId(),
      firstName: 'Jennifer',
      lastName: 'Aniston',
      emails: [
         'aniston@jennifer.com',
         'aniston2@jennifer2.com',
         'aniston3@jennifer3.com',
      ]
    },
    {
      id: getUniqueId(),
      firstName: 'Benicio',
      lastName: 'Del Toro',
      emails: [
         'deltoro@Benicio .com',
         'deltoro2@Benicio2 .com',
         'deltoro3@Benicio3.com',
      ]
    },
    {
      id: getUniqueId(),
      firstName: 'Rosario',
      lastName: 'Dawson',
      emails: [
         'dawson@rosario.com',
         'dawson2@rosario2.com',
         'dawson3@rosario3.com',
      ]
    },
    {
      id: getUniqueId(),
      firstName: 'Luis',
      lastName: 'Gúzman',
      emails: [
         'guzman@luis.com',
         'guzman2@luis2.com',
         'guzman3@luis3.com',
         'guzman4@luis4.com',
         'guzman5@luis5.com',
      ]
    }
  ]);
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
    const tableMdViewportWidth = 767;

    if(window.innerWidth <= tableMdViewportWidth) {
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

    if(contacts && contacts.length === 1) {
      setIsOpenDetails(false);
      setTimeout(() => {  
        setcontacts(null);
        clearDetails();
      }, detailsSlideDelay);      
      return;
    }

    if(contacts && selectedContact && selectedContactIndex !== null) {
      setIsOpenDetails(false);
      setTimeout(() => {
        const newContactList = [ ...contacts ];
        newContactList.splice(selectedContactIndex, 1);
        setcontacts(newContactList);    
        setSelectedContact(null);
        setToastNotification({
            id: getUniqueId(), message: 
            `${fullName} has been removed from your contacts.`
        });
      }, detailsSlideDelay);
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
    updateToastMessage(`${emailToRemove} has been removed temporarily. To make this a permanent change, click on Save.`);
  }

  const handleFirstNameUpdate = (firstName: string): void => {
    const contact = { ...selectedContact } as Contact; 
    contact.firstName = firstName;
    updateEditingStatus(contact);
    setSelectedContact(contact);
    verifyEditingErrors(contact);
  }

  const handleLastNameUpdate = (lastName: string): void => {
    const contact = { ...selectedContact } as Contact; 
    contact.lastName = lastName;
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

    if(selectedContact !== null  && 
      !fieldsConfig.firstName.regex.test(contact.firstName)) {  
      hasErrors = true;
    } 

    if(selectedContact !== null  && 
      !fieldsConfig.lastName.regex.test(contact.lastName)) {  
        hasErrors = true;
    } 

    contact.emails.forEach(email => {
      if(!fieldsConfig.email.regex.test(email)) {
        hasErrors = true;
      }
    });

    setHasError(hasErrors);
  }

  // Create/Update Contact
  const addNewContactToPopulatedList = (newContact: Contact):void => {
    const contactList: Contact[] = contacts ? [...contacts] : [];
    const index = contacts ? contacts.length : 0;
    newContact.id = getUniqueId();
    contactList.push(newContact);

    updateContactList(contactList);    
    switchSelectedContact(newContact, index);
    updateToastMessage(`${newContact.firstName} ${newContact.lastName} has been saved.`);
  }

  const addNewContactToEmptyList = (newContact: Contact):void => {
    newContact.id = getUniqueId();

    updateContactList([newContact]);
    switchSelectedContact(newContact, 0);
    updateToastMessage(`${newContact.firstName} ${newContact.lastName} has been updated.`);
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
        <h1>
          <div>
            <img src={IconPeople} alt='Icon of People' />
            Moisés Contacts
          </div>          
        </h1>        
      </header>
      <main>
        <Contacts 
          contacts={contacts} 
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
