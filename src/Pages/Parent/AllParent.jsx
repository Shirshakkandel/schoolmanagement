import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components/macro'
import { FormInput } from '../../components/UI/Form/FormInput'
import Model from '../../components/UI/Model'
import { TableStyle } from '../../components/UI/TableStyle'

function AllParent({ title, subTitle, width, open }) {
  const [parents, setParents] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchAllStudent() {
      try {
        const { data } = await axios.get(`/api/parent/viewAllParentDetail`)
        console.log(data)
        setParents(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllStudent()
  }, [])

  function search(parents) {
    return parents
  }
  const [searchField, setSearchField] = useState({
    idSearch: '',
    fnameSearch: '',
    contactNumberSearch: '',
  })
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
      <form action="">
        <div className="searchBox grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          <FormInput
            placeholder="Search By Id"
            type="number"
            value={searchField.idSearch}
            name="idSearch"
            onChange={handlerChange}
          />
          <FormInput
            placeholder="Search By Name"
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
            className=" w-full block bg-yellow-300 h-10 p-2 my-2  md:w-50 outline-none"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="overflow-x-auto mb-6">
        <DataTable
          data={search(parents)}
          width={width}
          loading={loading}
          //   deleteStudent={deleteStudent}
        />
      </div>
    </div>
  )
}

function DataTable({ data, width, loading }) {
  let history = useHistory()
  const { id } = useParams()
  async function detailView(id) {
    history.push(`/studentdetails/${id}`)
  }

  const [deletePopup, setDeletePopup] = useState(false)
  const [deleteAction, setDeleteAction] = useState(false)

  async function deleteParent(id) {
    await axios.delete(`/api/parent/deleteParentDetail/${id}`)
  }

  return (
    <TableStyle width={width}>
      <thead>
        <tr>
          {/* {students[0] &&
                columns.map((heading) => <th key={heading}>{heading}</th>)} */}
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
        <div className=" text-center">Loading</div>
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
                    onClick={() => history.push(`updateStudentForm/${id}`)}
                  >
                    Update
                  </span>
                  <div
                    className="hover:text-red-500 pr-1 mt-1 hover:border-none"
                    onClick={() => {
                      setDeletePopup(deleteParent(id))
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
  )
}

export default AllParent
