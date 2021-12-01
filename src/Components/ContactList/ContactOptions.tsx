import { FunctionComponent, useState } from 'react'

interface Props {
  contactId: string
  onDelete: (contactId: string) => void
}

const ContactOptions: FunctionComponent<Props> = ({ contactId, onDelete }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  const toggleOptions = (): void => {
    setShowOptions(!showOptions)
  }

  const onBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.relatedTarget) {
      toggleOptions()
    }
  }

  return (
    <div className="absolute right-1.5 top-0" onBlur={(e) => onBlur(e)}>
      <div className="text-right">
        <button className="p-2" onClick={toggleOptions}>
          . . .
        </button>
      </div>
      {showOptions && (
        <ul className="bg-white border border-gray-100 py-3 px-4 shadow-lg text-right text-sm">
          <li className="mb-2">
            <button>Edit</button>
          </li>
          <li>
            <button
              onClick={() => {
                onDelete(contactId)
                toggleOptions()
              }}
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ContactOptions
