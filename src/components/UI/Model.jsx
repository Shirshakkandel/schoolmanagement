import React from 'react'
import styled from 'styled-components'

function Model({ heading, setDeletePopup, setDeleteAction }) {
  return (
    <ModelStyle
      className="popup fixed top-0 left-0 w-full h-full bg-black opacity-80 grid  place-items-center transition-all "
      onClick={() => setDeletePopup(false)}
    >
      <div className="popup-inner relative p-9 w-full max-w-sm bg-white text-black z-50 ">
        <button
          className="close-btn absolute top-2 right-2"
          onClick={() => setDeletePopup(false)}
        >
          close
        </button>
        <div className="heading">{heading}</div>
        <div className="action absolute bottom-2 right-2">
          <button
            onClick={() => {
              setDeleteAction(true)
              setDeletePopup(false)
            }}
          >
            Ok
          </button>
          <button onClick={() => setDeletePopup(false)}>Cancel</button>
        </div>
      </div>
    </ModelStyle>
  )
}

export default Model

const ModelStyle = styled.div``
