import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import FormContainer from '../../components/UI/Form/FormContainer'
import { FormInput } from '../../components/UI/Form/FormInput'
import Loader from '../../components/UI/Loader'
import PopupMessage from '../../components/UI/Model'
import PageHeader from '../../components/UI/PageHeader'
import { SButton } from '../../components/UI/SButton.styles'
import { TableStyle } from '../../components/UI/TableStyle'
import { useWindowSize } from '../../globalState/globalState'

function Teachers({ open }) {
  const width = useWindowSize()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [deleteTeacher, setDeleteTeacher] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [isSearchData, setIsSearchData] = useState(false)
  const [searchData, setSearchData] = useState([])
  const history = useHistory()
  const [searchField, setSearchField] = useState({
    idSearch: '',
    fnameSearch: '',
    contactNumberSearch: '',
  })

  useEffect(() => {
    const url = '/api/teacher/viewAllTeacherDetail'
    async function fetchTeachers() {
      try {
        setLoading(true)
        const { data } = await axios.get(url)
        if (data) {
          setLoading(false)
          setTeachers(data)
        }
      } catch (err) {
        setMessage('Cannot fetch Teachers try again')
        setLoading(false)
      }
    }
    fetchTeachers()
  }, [])

  function handlerChange(e) {
    const name = e.target.name
    const value = e.target.value
    setSearchField({ ...searchField, [name]: value })
  }

  //delete selected data
  async function deleteHandler(id) {
    const deleteUrl = `/api/teacher/deleteTeacherDetailById/${id}`
    try {
      const { data } = await axios.delete(deleteUrl)
      if (data) {
        // setMessage('Admin deleted succesfully')
      }
      window.location.reload()
    } catch (err) {
      setLoading(false)
    }
  }

  async function search(e) {
    e.preventDefault()
    if (searchField.idSearch) {
      let idUrl = '/api/teacher/viewTeacherDetailById/' + searchField.idSearch
      try {
        let { data } = await axios.get(idUrl)
        setSearchData([data])
        setIsSearchData(true)
      } catch (err) {
        setIsSearchData(true)
      }
    }

    if (searchField.fnameSearch) {
      const fnameUrl =
        '/api/teacher/searchTeacherDetailByFirstName/' + searchField.fnameSearch
      try {
        let { data } = await axios.get(fnameUrl)
        setSearchData([data])
        setIsSearchData(true)
      } catch (err) {
        setIsSearchData(true)
      }
    }

    if (searchField.contactNumberSearch) {
      let contactUrl =
        '/api/teacher/searchTeacherDetailByContactNumber/' +
        searchField.contactNumberSearch
      try {
        let { data } = await axios.get(contactUrl)
        setSearchData(data)
        setIsSearchData(true)
      } catch (err) {
        setIsSearchData(true)
      }
    }

    console.log(searchData)
  }

  function resetHandler() {
    setIsSearchData(false)
    setSearchData([])
    setSearchField({
      idSearch: '',
      fnameSearch: '',
      contactNumberSearch: '',
    })
  }
  return (
    <PageHeader
      width={width}
      open={open}
      title="Teacher"
      subTitle="Teacher List"
    >
      {deleteTeacher && (
        <PopupMessage
          message={
            'Are you sure you want to delete id no ' + deleteId + ' Teacher'
          }
          action={() => deleteHandler(deleteId)}
          handleClose={() => setDeleteTeacher(false)}
          cancel="No"
          actionWord="Yes"
        />
      )}
      <form onSubmit={search} type="post">
        <FormContainer col={5}>
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
            placeholder="Search By Contact"
            value={searchField.contactNumberSearch}
            name="contactNumberSearch"
            onChange={handlerChange}
            type="number"
          />

          <button
            type="submit"
            className=" w-full block bg-yellow-500 h-10 p-2 my-2  md:w-50  focus:outline-none  focus:bg-opacity-80"
          >
            Search
          </button>

          <button
            type="button"
            className=" w-full block bg-red-500 h-10 p-2 my-2 text-gray-100  md:w-50  focus:outline-none  focus:bg-opacity-80"
            onClick={() => resetHandler()}
          >
            Reset
          </button>
        </FormContainer>
      </form>
      <h2 className="text-center my-4">Teacher List</h2>
      <div className="overflow-x-auto mb-6">
        <TableStyle width={width}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Contanct Number</th>
              <th>Emergency Contact Number</th>

              <th>Subject</th>
              <th>Joining Date</th>
              <th>Total Earning</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader />
            ) : (
              (isSearchData ? searchData : teachers).map((teacher) => (
                <tr key={(isSearchData ? searchData : teachers).key}>
                  <td>{teacher.id}</td>
                  <td>{`${teacher.fname} ${teacher.mname} ${teacher.lname}`}</td>
                  <td>{teacher.gender}</td>
                  <td>{teacher.contactNumber}</td>
                  <td>{teacher.emergencyContactNumber}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.joiningDate}</td>
                  <td>{teacher.totalEarning}</td>
                  <td className="bigSize">
                    <SButton
                      p={2}
                      green
                      onClick={() =>
                        history.push('teacherDetail/' + teacher.id)
                      }
                    >
                      Details
                    </SButton>

                    <SButton
                      p={2}
                      blue
                      onClick={() =>
                        history.push(`updateTeacher/${teacher.id}`)
                      }
                    >
                      Update
                    </SButton>

                    <SButton
                      p={2}
                      red
                      onClick={() => {
                        setDeleteTeacher(true)
                        setDeleteId(teacher.id)
                      }}
                    >
                      Delete
                    </SButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </TableStyle>
      </div>
    </PageHeader>
  )
}

export default Teachers
