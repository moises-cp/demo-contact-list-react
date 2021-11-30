import { FunctionComponent } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const Card: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="bg-white border border-gray-100 p-8 shadow-lg">
      {children}
    </div>
  )
}

export default Card
