import { useState } from 'react'
import Contacts from './Components/ContactList/ContactList'
import ContactOptions from './Components/ContactList/ContactOptions'
import { ContactList, AlertConfig } from './types'
import Alert from './Components/Alert'
import { sortObjectByFirstNameAsc } from './util'

import IconPeople from './Assets/img/icon/people-icon-contacts-alpha-50x36.png'
import { defaultContactList } from './Data/defaultContacts'

const App = () => {
  const [contacts, setcontacts] = useState<ContactList | null>(
    sortObjectByFirstNameAsc(defaultContactList)
  )

  // Alert
  const [alertIsVisible, setAlertIsVisible] = useState<boolean>(false)
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null)

  const closeAlert = () => {
    setAlertIsVisible(false)
  }

  const deleteContact = (contactId?: string): void => {
    if (contacts?.length) {
      const localContactList = [...contacts].filter(
        (contact) => contact.id !== contactId
      )
      setcontacts(localContactList)
    }
  }

  const onDeleteContact = (contactId: string) => {
    setAlertConfig({
      id: contactId,
      message: 'Are you sure you want to delete this contact?',
      onCancel: closeAlert,
      onConfirm: deleteContact,
    })
    setAlertIsVisible(true)
  }

  return (
    <div className="min-h-screen">
      <header className="flex bg-blue-500 items-center py-2">
        <div className="flex items-center pl-4 w-2/6">
          <img src={IconPeople} alt="Icon of People" />
          <span className="ml-8 text-white">Moisés Contacts</span>
        </div>

        <div className="w-2/6">
          <input
            className="outline-none px-2 py-1 rounded text-gray-700 w-full"
            type="search"
            placeholder="Search Contact"
          />
        </div>

        <div className="w-2/6"></div>
      </header>
      <main className="flex flex-wrap">
        <header className="bg-blue-50 mb-4 px-4 py-2 w-full">
          <button>Add Contact</button>
        </header>

        <Contacts contacts={contacts}>
          <ContactOptions contactId="" onDelete={onDeleteContact} />
        </Contacts>

        <Alert visible={alertIsVisible} config={alertConfig} />
      </main>
    </div>
  )
}

export default App
