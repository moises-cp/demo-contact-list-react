import { FunctionComponent, useState } from 'react'

interface Props {
  contactId: string
  onDelete: (contactId: string) => void
}

const ContactOptions: FunctionComponent<Props> = ({ contactId, onDelete }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const onClickOptions = (): void => {
    setShowOptions(!showOptions)
  }

  return (
    <div className="absolute right-1.5 top-0">
      <div className="text-right">
        <button className="p-2" onClick={onClickOptions}>
          . . .
        </button>
      </div>
      {showOptions && (
        <ul className="bg-white border border-gray-100 py-3 px-4 shadow-lg text-right text-sm">
          <li className="mb-2">
            <button>Edit</button>
          </li>
          <li>
            <button onClick={() => onDelete(contactId)}>Delete</button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ContactOptions
