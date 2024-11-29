import { toast, ToastPosition } from '@backpackapp-io/react-native-toast'

const bottomToastPromise = (promise, { loading, error, success }) => {
  toast.promise(
    promise,
    {
      loading,
      success,
      error,
    },
    {
      position: ToastPosition.BOTTOM,
    },
  )
}

export { bottomToastPromise }
