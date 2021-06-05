import React from 'react'

export default function Model({
  message,
  handleClose,
  action,
  cancel,
  clear,
  actionWord,
}) {
  return (
    <div className="fixed left-0 top-0 min-h-screen w-screen  grid place-items-center z-40">
      <div
        className="fixed bg-black bg-opacity-50 left-0 top-0 h-screen w-screen z-40"
        onClick={() => {
          clear && clear()
          handleClose()
        }}
      ></div>
      <div className="bg-white p-4 rounded z-50 opacity-100">
        <div>{message}</div>
        <div
          className={`${
            !cancel && 'flex flex-1 justify-center'
          } m-2 text-right space-x-2`}
        >
          <div
            className={`inline-block  bg-red-500 h-10 leading-10 hover:bg-red-800 cursor-pointer text-white px-3 rounded`}
            onClick={() => {
              action && action()
              clear && clear()
              handleClose()
            }}
          >
            {actionWord || 'Ok'}
          </div>

          {cancel && (
            <div
              className="inline-block bg-blue-700 h-10 leading-10 hover:bg-blue-800 cursor-pointer text-white px-3 rounded"
              onClick={handleClose}
            >
              {cancel}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
