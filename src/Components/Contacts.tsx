import React, { FunctionComponent } from 'react';
import { ContactList, Contact } from '../types';

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
  switchSelectedContact,
}) => {
  const onClickAddNewContact = (): void => {
    onClickClearDetails();
    onClickOpenDetails();
  };

  return (
    <div className="w-full">
      <header className="bg-blue-50 mb-4 px-4 py-2 w-full">
        <button onClick={onClickAddNewContact}>Add Contact</button>
      </header>

      <div className="gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8">
        {contacts &&
          contacts.length > 0 &&
          contacts.map((contact, index) => {
            return (
              <article
                className="border border-gray-100 h-80 hover:shadow-2xl p-4 rounded shadow-lg"
                key={contact.id}
                onClick={() => switchSelectedContact(contact, index)}
              >
                <figure className="h-40 mb-1">
                  <img
                    alt={`Profile ${contact.firstName} ${contact.lastName}`}
                    className="h-36 max-h-full block mx-auto rounded-full w-36"
                    src={`/img/${contact.profileImage}`}
                  />
                </figure>

                <p className="text-center">
                  {contact.firstName} {contact.lastName}
                </p>
                <p className="text-center text-gray-400 text-sm">
                  Civil Engineer
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
                  <li className="text-center">
                    <a href="#">Call</a>
                  </li>
                  <li className="text-center">
                    <a href="#">Message</a>
                  </li>
                  <li className="text-center">
                    <a href="#">Video</a>
                  </li>
                  <li className="text-center">
                    <a href="#">Call</a>
                  </li>
                </ul>
              </article>
            );
          })}
      </div>
    </div>
  );
};

export default Contacts;
