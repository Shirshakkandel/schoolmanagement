import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import { FormInput } from '../../components/UI/Form/FormInput'
import PopupMessage from '../../components/UI/Model'
import { TableStyle } from '../../components/UI/TableStyle'

function AllParent({ title, subTitle, width, open }) {
  const [parents, setParents] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messagePopup, setMessagePopup] = useState(false)
  const [searchParent, setSearchParent] = useState([])
  const [showallParent, setShowAllParent] = useState(true)
  const [searchField, setSearchField] = useState({
    idSearch: '',
    fnameSearch: '',
    contactNumberSearch: '',
  })
  useEffect(() => {
    async function fetchAllStudent() {
      try {
        const { data } = await axios.get(`/api/parent/viewAllParentDetail`)
        setParents(data)
        // console.log(data)
        setLoading(false)
      } catch (err) {}
    }
    fetchAllStudent()
  }, [])

  async function search(e) {
    e.preventDefault()
    if (searchField.idSearch) {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `/api/parent/viewParentDetailById/${searchField.idSearch}`
        )
        if (data) {
          let value = []
          value.push(data)
          setShowAllParent(false)
          setSearchParent(value)
          setLoading(false)
        }
      } catch (err) {
        setMessage(`No Parent Details with given id ${searchField.idSearch}`)
        setSearchParent([])
        setLoading(false)
        setMessagePopup(true)
        setShowAllParent(false)
      }
    }

    if (searchField.fnameSearch) {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `/api/parent/searchParentDetailByFirstName/${searchField.fnameSearch}`
        )
        if (data) {
          setSearchParent(data)
          setLoading(false)
        }
      } catch (err) {
        setMessage('Cannot find Parent Detail with given contact Number')
        setSearchParent([])
        setLoading(false)
        setMessagePopup(true)
      }
    }

    if (searchField.contactNumberSearch) {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `/api/parent/searchParentDetailByContactNumber/${searchField.contactNumberSearch}`
        )
        if (data) {
          setSearchParent(data)
          setShowAllParent(false)
          setLoading(false)
        }
      } catch (err) {
        setMessage(
          `No parent detail with number ${searchField.contactNumberSearch}`
        )
        setSearchParent([])
        setLoading(false)
        setShowAllParent(false)
        setMessagePopup(true)
      }
    }
  }

  function handlerChange(e) {
    setSearchField({ ...searchField, [e.target.name]: e.target.value })
  }
  return (
    <div
      width={width}
      className={`bg-gray-200 h-auto ml-${
        width > 1024 && open ? 80 : 0
      } p-8 transition-all duration-500 ease-in-out`}
      overflow-x-hidden
    >
      <h1 className="h-6 text-lg font-bold ">{title}</h1>
      <div className="pb-3">
        Home <span className="text-yellow-600"> &gt; {subTitle}</span>
      </div>
      <form onSubmit={search}>
        <div className="searchBox grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <FormInput
            placeholder="Search By Id"
            type="number"
            value={searchField.idSearch}
            name="idSearch"
            onChange={handlerChange}
          />
          <FormInput
            placeholder="Search By First Name"
            value={searchField.fnameSearch}
            name="fnameSearch"
            onChange={handlerChange}
          />
          <FormInput
            placeholder="Search By Contact Number"
            type="number"
            value={searchField.contactNumberSearch}
            name="contactNumberSearch"
            onChange={handlerChange}
          />
          <button
            type="submit"
            className=" w-full block bg-yellow-300 h-10 p-2 my-2  md:w-50  focus:outline-none  focus:bg-opacity-80"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="overflow-x-auto mb-6">
        <DataTable
          data={showallParent ? parents : searchParent}
          width={width}
          loading={loading}
          message={message}
          setMessage={setMessage}
          messagePopup={messagePopup}
          setMessagePopup={setMessagePopup}
          //   deleteStudent={deleteStudent}
        />
      </div>
    </div>
  )
}

function DataTable({
  data,
  width,
  loading,
  message,
  setMessagePopup,
  messagePopup,
  setMessage,
}) {
  let history = useHistory()

  async function detailView(id) {
    history.push(`/parentDetails/${id}`)
  }
  const [deletePopup, setDeletePopup] = useState(false)

  const [id, setId] = useState(null)

  async function deleteParent(id) {
    await axios.delete(`/api/parent/deleteParentDetail/${id}`)
  }

  return (
    <>
      {deletePopup && (
        <PopupMessage
          popUp={deletePopup}
          message="Are you sure you want to delete?"
          handleClose={() => setDeletePopup(false)}
          action={() => deleteParent(id)}
          cancel="Cancel"
        />
      )}

      <TableStyle width={width} loading={loading} message={message}>
        <thead>
          <tr>
            <th className="smallsize">Id</th>
            <th>Name</th>
            <th className="smallsize">Gender</th>
            <th>Address</th>
            <th className="mediumSize">Date Of Birth</th>
            <th>Contact Number</th>
            <th className="bigSize">E-mail</th>
            <th>Action</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td>Loading</td>
            </tr>
          </tbody>
        ) : message ? (
          messagePopup && (
            <PopupMessage
              message={message}
              handleClose={() => setMessagePopup(false)}
              clear={() => setMessage('')}
            />
          )
        ) : (
          <tbody>
            {data.map(
              ({
                id,
                fname,
                lname,
                mname,
                gender,
                address,
                dob,
                contactNumber,
                email,
              }) => (
                <tr
                  key={id}
                  //
                  className="hover:opacity-70 cursor-pointer "
                >
                  <td className="smallsize">{id}</td>
                  <td className="">{`${fname} ${mname} ${lname}`}</td>
                  <td>{gender}</td>
                  <td>{address}</td>
                  <td className="mediumSize">{dob}</td>
                  <td>{contactNumber}</td>
                  <td className="bigSize">{email}</td>
                  <td className="bigSize">
                    <span
                      className="hover:text-green-700 pr-2"
                      onClick={() => detailView(id)}
                    >
                      Details
                    </span>
                    <span
                      className="hover:text-gray-800 pr-1"
                      onClick={() => history.push(`updateParentForm/${id}`)}
                    >
                      Update
                    </span>
                    <div
                      className="hover:text-red-500 pr-1 mt-1 hover:border-none"
                      onClick={() => {
                        setDeletePopup(true)
                        setId(id)
                      }}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        )}
      </TableStyle>
    </>
  )
}

export default AllParent
