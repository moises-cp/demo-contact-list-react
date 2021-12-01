import { Fragment, FunctionComponent } from 'react'
import Card from '../layout/CardLayout'
import Button from '../layout/ButtonLayout'

interface Props {
  visible: boolean
  config: {
    id?: string
    message: string
    onCancel: () => void
    onConfirm: Function
  } | null
}

const Alert: FunctionComponent<Props> = ({ visible, config }) => {
  const onConfirmation = () => {
    config?.onConfirm(config.id)
    config?.onCancel()
  }

  return visible ? (
    <div className="bg-white bg-opacity-75 fixed flex items-center justify-center left-0 top-0 w-full h-screen">
      <Card>
        <div className="mb-6">{config?.message}</div>
        <div className="flex justify-center">
          <Button isDanger={true} onClick={onConfirmation}>
            Yes
          </Button>
          <Button className="ml-8" onClick={config?.onCancel}>
            No
          </Button>
        </div>
      </Card>
    </div>
  ) : (
    <Fragment></Fragment>
  )
}

export default Alert
