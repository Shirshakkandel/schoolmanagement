import React from 'react'
import { useHistory } from 'react-router'

export default function Detail({ data, name, children, updateLink }) {
  const history = useHistory()
  return (
    <div className="card  bg-white flex flex-col space-x-4 p-1 md:flex-row md:p-5 md:space-x-10">
      <img
        className="image mx-auto my-3 max-h-80"
        src={`${
          data.gender === 'Female'
            ? '/images/femaleStudent.jpg'
            : '/images/maleStudent.png'
        }`}
      />
      <div className="right flex flex-col flex-1">
        <div className="heading flex justify-between">
          <h2 className="font-extrabold text-gray-600 mb-5 w-/4 p-2">{name}</h2>
          <div className="icon my-2">
            <button
              onClick={() => history.push(updateLink)}
              className="hover:cursor focus:outline-none mr-6  bg-red-600 p-2 text-white text-center"
            >
              Update
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
