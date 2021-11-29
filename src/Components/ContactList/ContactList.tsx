import React, { FunctionComponent } from 'react'
import { AnchorUrlType, ContactList, Contact } from '../../types'
import { socialIcon } from '../../config'
import SocialIcon from './SocialIcon'

interface Props {
  contacts: ContactList | null
  hasErrors: boolean
  onClickClearDetails: () => void
  onClickOpenDetails: () => void
  selectedContactId?: number
  switchSelectedContact: (contact: Contact, index: number) => void
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
    onClickClearDetails()
    onClickOpenDetails()
  }

  return (
    <div className="w-full">
      <header className="bg-blue-50 mb-4 px-4 py-2 w-full">
        <button onClick={onClickAddNewContact}>Add Contact</button>
      </header>

      <div className="gap-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8">
        {contacts &&
          contacts.length &&
          contacts.map((contact, index) => {
            return (
              <article
                className="border border-gray-100 hover:shadow-2xl p-4 rounded shadow-lg"
                key={contact.id}
                onClick={() => switchSelectedContact(contact, index)}
              >
                <figure className="h-40 mb-1">
                  <img
                    alt={`Profile ${contact.firstName} ${contact.lastName}`}
                    className="h-36 max-h-full block mx-auto rounded-full w-36"
                    src={`/img/${contact.profileImage}`}
                    title={`${contact.firstName} ${contact.lastName}`}
                  />
                </figure>

                <p className="text-center">
                  {contact.firstName} {contact.lastName}
                </p>

                <p className="text-center text-gray-400 text-sm">
                  Civil Engineer
                </p>

                <ul className="gap-x-3 gap-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
                  <SocialIcon
                    alt={`Phone ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.phone}
                    title="Phone"
                    url={`tel:${contact.url.phonePrimary}`}
                  />

                  <SocialIcon
                    alt={`Email ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.email}
                    title="Email"
                    url={`mailto:${contact.url.emailPrimary}`}
                  />

                  <SocialIcon
                    alt={`Website ${contact.firstName} ${contact.lastName}`}
                    label="Website"
                    title="Website"
                    url={contact.url.website ?? ''}
                  />

                  <SocialIcon
                    alt={`GitHub ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.github}
                    title="GitHub"
                    url={contact.url.github ?? ''}
                  />

                  <SocialIcon
                    alt={`LinkedIn ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.linkedin}
                    title="LinkedIn"
                    url={contact.url.linkedin ?? ''}
                  />

                  <SocialIcon
                    alt={`Facebook ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.facebook}
                    title="Facebook"
                    url={contact.url.facebook ?? ''}
                  />

                  <SocialIcon
                    alt={`YouTube ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.youtube}
                    title="YouTube"
                    url={contact.url.youtube ?? ''}
                  />

                  <SocialIcon
                    alt={`Twitter ${contact.firstName} ${contact.lastName}`}
                    icon={socialIcon.twitter}
                    title="Twitter"
                    url={contact.url.twitter ?? ''}
                  />
                </ul>
              </article>
            )
          })}
      </div>
    </div>
  )
}

export default Contacts
