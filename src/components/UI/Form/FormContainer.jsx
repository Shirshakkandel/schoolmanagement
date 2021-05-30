import React from 'react'

export default function FormContainer({ children, col }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-2 lg:${
        col && `grid-cols-${col}`
      }`}
    >
      {children}
    </div>
  )
}
