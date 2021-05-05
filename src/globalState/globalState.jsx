import React, { useEffect, useState } from 'react'

export function useOpen() {
  const [open, setOpen] = useState(false)
  return [open, setOpen]
}

export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [width])
  return width
}
