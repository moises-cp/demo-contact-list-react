import { FunctionComponent } from 'react'
import { socialIcon } from '../../config'

interface Props {
  alt: string
  label?: string
  icon?: string
  title: string
  url: string
}

const SocialIcon: FunctionComponent<Props> = ({
  alt,
  label,
  icon,
  title,
  url,
}) => {
  const iconStyle = icon === socialIcon.twitter ? 'h-7' : 'max-h-7'

  return (
    <li className="flex items-center justify-center text-center">
      <a href={url} rel="noreferrer" target="_blank">
        {!icon && label}

        {icon && (
          <img
            alt={alt}
            className={`${iconStyle} max-w-full`}
            src={`/img/${icon}`}
            title={title}
          />
        )}
      </a>
    </li>
  )
}

export default SocialIcon
