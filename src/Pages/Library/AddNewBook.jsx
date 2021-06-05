import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styled from 'styled-components/macro'

function AddNewBook({ width, open, title, subTitle }) {
  const [classDropDown] = useState(false)

  const [newBook, setNewBook] = useState({
    bookName: '',
    subject: '',
    writter: '',
    class: '',
    idNum: '',
    publish: '',
    upload: '',
  })

  const NewBookForm = [
    { id: 1, label: 'Book Name *', name: 'bookName', value: newBook.bookName },
    { id: 2, label: 'Subject *', name: 'subject', value: newBook.subject },
    { id: 3, label: 'Writter *', name: 'writter', value: newBook.writter },

    {
      id: 4,
      label: 'Class *',
      name: 'class',
      value: newBook.class,
      icon: classDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />,
      options: [
        { id: 1, label: 'Select Class *' },
        { id: 2, label: 'Play' },
        { id: 3, label: 'Nursery' },
        { id: 4, label: 'One' },
        { id: 5, label: 'Two' },
        { id: 6, label: 'Three' },
        { id: 7, label: 'Four' },
        { id: 8, label: 'Five' },
      ],
    },

    { id: 5, label: 'Id No *', name: 'idNum', value: newBook.idNum },
    {
      id: 6,
      label: 'Publishing Date *',
      name: 'publish',
      value: newBook.publish,
    },
    { id: 7, label: 'Uploading Date *', name: 'upload', value: newBook.upload },
  ]

  const resetHandler = (e) => {
    e.preventDefault()
    setNewBook({
      bookName: '',
      subject: '',
      writter: '',
      class: '',
      idNum: '',
      publish: '',
      upload: '',
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    alert('Submitted button clicked')
  }

  return (
    <AddNewBookStyle
      className={`bg-gray-300 h-auto ml-${
        width > 1024 && open ? 80 : 0
      } p-8 transition-all duration-500 ease-in-out`}
    >
      <h1 className="h-6 text-lg font-bold ">{title}</h1>
      <div className="pb-3">
        Home <span className="text-yellow-600">&gt; {subTitle}</span>
      </div>

      <div className="card bg-white py-3 px-5 h-auto">
        <div className="card__body">
          <div className="card__header flex  justify-between items-center cursor-pointer">
            <div className="item__title ">
              <h3 className="font-bold pb-3">Add New Book</h3>
            </div>
          </div>

          <form className="form" onSubmit={submitHandler}>
            <div className=" form__group grid  gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {NewBookForm.map(({ id, label, name, options, icon, value }) => (
                <SingleFormGroup
                  key={id}
                  id={id}
                  label={label}
                  name={name}
                  options={options}
                  icon={icon}
                  value={value}
                  newBook={newBook}
                  setNewBook={setNewBook}
                />
              ))}
            </div>
            <div className="buttonGroup">
              <button
                className="mr-5 mt-3 w-2/5 bg-yellow-400  font-bold text-white py-2 md:w-40"
                type="submit"
              >
                Save
              </button>

              <button
                onClick={(e) => resetHandler(e)}
                className="mr-5 mt-3 w-2/5 bg-blue-700  font-bold text-white py-2 md:w-40"
              >
                {' '}
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </AddNewBookStyle>
  )
}

export default AddNewBook

const SingleFormGroup = ({
  id,
  label,
  name,
  options,
  icon,
  value,
  newBook,
  setNewBook,
}) => {
  const handlerInput = (e) => {
    name = e.target.name
    value = e.target.value
    setNewBook({ ...newBook, [name]: value })
  }

  return !options ? (
    <div key={id} className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input
        className="bg-gray-300 outline-none h-10 p-3"
        type="text"
        name={name}
        value={value}
        onChange={handlerInput}
        required
      />
    </div>
  ) : (
    <div key={id} className="flex flex-col">
      <label htmlFor="">{label}</label>
      <select
        className="bg-gray-300 outline-none h-10"
        onChange={handlerInput}
        name={name}
        id=""
      >
        {options.map(({ id, label }) => (
          <option key={id} className="outline-none h-5" value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

const AddNewBookStyle = styled.div``
