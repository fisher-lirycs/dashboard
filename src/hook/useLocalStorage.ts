import { useCallback, useState } from 'react'

export type UseLocalStorageOptions = {
  readonly serialize: (value: unknown) => string
  readonly deserialize: (value: string) => unknown
}

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: UseLocalStorageOptions,
): [T, (value: T) => void] => {
  const { deserialize = JSON.parse, serialize = JSON.stringify } = options || {}
  const [storedValue, setStoredValue] = useState(
    typeof window !== 'undefined'
      ? () => {
          try {
            const item = deserialize(localStorage.getItem(key) as string) || initialValue
            return item
          } catch (error) {
            console.error(error)
          }
        }
      : '',
  )

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        localStorage.setItem(key, serialize(value))
      } catch (error) {
        console.error(error)
      }
    },
    [key, serialize],
  )

  return [storedValue, setValue]
}
