import React, { useState } from "react";
import Contacts from "./Components/Contacts/Contacts";
import Details from "./Components/Details/Details";
import ToastNotification from './Components/ToastNotification/ToastNotification';
import "./App.scss";
import { ContactList, Contact } from './types';
import { getUniqueId } from "./util";
import { fieldsConfig } from './config';

const contactTemplate = {
  id: getUniqueId(),
  firstName: '',
  lastName: '',
  emails: []
};

const App = () => {

  /**
   * State
   */
  const [contacts, setcontacts] = useState<ContactList>([
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
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contactTemplate);
  const [selectedContactIndex, setSelectedContactIndex] = useState<number | null>(null);

  
  // const [isEditingValid, setIsEditingValid] = useState<boolean>(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);  
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  // const [showDetailsOnMobile, setShowDetailsOnMobile] = useState<boolean>(false);

  /**
   * Contact list
   */
   const switchSelectedContact = (contact: Contact, index: number): void => {
    setSelectedContact(contact);
    setSelectedContactIndex(index);
    setIsEdited(false);
  }

  
  /**
   * Handle Contact Detail Buttons
   */
  const clearDetails = () => {
    setSelectedContact(contactTemplate);
    setSelectedContactIndex(null);
    setIsEdited(false);
  }

  const deleteSelectedContact = (): void => {
    if(selectedContact) {
      const newContactList = contacts.filter(contact => contact.id !== selectedContact?.id);
      setcontacts(newContactList);
      setSelectedContact(null);
      setToastMessage('Contact has been deleted.');
    }
  }

  const saveContact = (): void => {
    const contactList = [...contacts];
    const newContact = { ...selectedContact } as Contact; 
    const toastMessageSuccessful = 'Contact has been saved.';

    if(selectedContactIndex !== null && isEdited && !hasError) {
      contactList[selectedContactIndex] = {...newContact};
      updateContactList(contactList);
      setToastMessage(toastMessageSuccessful);
      return;
    }

    if(isEdited && !hasError) {
      contactList.push(newContact);
      updateContactList(contactList);
      setToastMessage(toastMessageSuccessful);
      return;
    }

    setToastMessage('Contact was not saved.');
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
    setToastMessage(`${emailToRemove} has been removed temporarily. To make this a permanent change, click on Save.`);
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
  const updateContactList = (contactList: ContactList): void => {
    setcontacts(contactList);
    setIsEdited(false);
  }

  const updateEditingStatus = (contact: Contact): void => {
    console.log('selectedContactIndex: ', selectedContactIndex);
    if(selectedContactIndex !== null) {
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

  return (
    <div className="App">
      <header>
        <h1>
          Moisés Contacts Demo
        </h1>        
      </header>
      <main>
        <Contacts 
          contacts={contacts} 
          onClickClearDetails={clearDetails}
          selectedContactId={selectedContact?.id}
          switchSelectedContact={switchSelectedContact}
        />
        <Details  
          hasErrors={hasError}
          isEdited={isEdited}
          onClickAddEmail={addEmailToContact}
          onClickCancel={clearDetails}
          onClickDeleteContact={deleteSelectedContact}
          onClickDeleteEmail={deleteContactEmail} 
          saveContact={saveContact}
          selectedContact={selectedContact}
          updateFirstName={handleFirstNameUpdate}
          updateLastName={handleLastNameUpdate}
          />
        <ToastNotification 
          message={toastMessage}
        />
      </main>
    </div>
  );
};

export default App;
