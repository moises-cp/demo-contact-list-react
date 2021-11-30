import { FunctionComponent, ReactElement } from 'react'

interface Props {
  children: ReactElement | string
  className?: string
  isDanger?: boolean
  onClick?: () => void
}

const button: FunctionComponent<Props> = ({
  children,
  className,
  isDanger,
  onClick,
}) => {
  const style = isDanger
    ? 'bg-red-500 hover:bg-red-700'
    : 'bg-blue-500 hover:bg-blue-700'

  return (
    <button
      className={` px-4 py-1 rounded text-white ${style} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default button
