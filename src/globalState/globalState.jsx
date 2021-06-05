import React, { useEffect, useState } from 'react'

function useOpen() {
  const [open, setOpen] = useState(false)
  return [open, setOpen]
}

function useWindowSize() {
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

function useLoading() {
  const [loading, setLoading] = React.useState(true)
  return [loading, setLoading]
}

export { useLoading, useWindowSize, useOpen }
