import { useEffect, useState } from 'react'

function getItem(key: string) {
  const item = window.localStorage.getItem(key)
  let result
  if (item !== null) {
    try {
      result = JSON.parse(item)
    } catch (e) {
      console.error(e);
    }
  }
  return result
}

function setItem(key: string, value) {
  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export const useLocalStorage = (key: string): [unknown, React.Dispatch<unknown>] => {
  const [value, setValue] = useState(() => getItem(key))

  useEffect(() => {
    setValue(getItem(key))
  }, [key])

  useEffect(() => {
    setItem(key, value)
  }, [value, key])

  return [value, setValue]
}
