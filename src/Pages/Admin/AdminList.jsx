import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FormInput } from '../../components/UI/Form/FormInput'
import PageHeader from '../../components/UI/PageHeader'
import { SButton } from '../../components/UI/Button.styles'
import { useWindowSize } from '../../globalState/globalState'
import styled from 'styled-components/macro'
import { TableStyle } from '../../components/UI/TableStyle'
import { CircularProgress } from '@material-ui/core'
import { MdArrowDownward, MdArrowUpward, MdSwapVert } from 'react-icons/md'
import { useHistory } from 'react-router'
import PopupMessage from '../../components/UI/Model'

function AdminList({ open }) {
  const width = useWindowSize()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [searchId, setSearchId] = useState('')
  const history = useHistory()
  const [key, setkey] = useState('')
  const [sortingByString, setSortingByString] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [deleteAdmin, setDeleteAdmin] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [isSearchData, setIsSearchData] = useState(false)
  const [direction, setDirection] = useState({
    id: '',
    fname: '',
    contactNumber: '',
    email: '',
  })

  //fetch all admin
  useEffect(() => {
    const allAdminUrl = '/api/admin/viewAllAdminDetail'
    async function fetchAdmins() {
      try {
        setLoading(true)
        // const { data } = await axios.get('/api/Subject/viewAllSubjectDetail')
        const { data } = await axios.get(allAdminUrl)
        if (data) {
          setAdmins(data)
          setLoading(false)
          console.log(admins)
        }
      } catch (err) {
        setMessage(err.response.data.message)
        setLoading(false)
      }
    }
    fetchAdmins()
  }, [])

  //fill code and name if update button and update data is loaded
  useEffect(() => {
    direction[key] === 'asc'
      ? setAdmins(admins.sort())
      : setAdmins(admins.reverse())

    setSortingByString(false)
  }, [sortingByString])

  // useEffect(() => {
  //   searchData && setIsSearchData(true)
  // }, [searchData])

  //delete selected data
  async function deleteHandler(id) {
    const deleteUrl = `/api/admin/deleteAdminDetailById/${id}`
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

  //sort data from column header we click
  async function sortDataByStringHandler(key) {
    // console.log('sort data from ' + key)

    setDirection({
      [key]: direction[key] === 'asc' ? 'des' : 'asc',
    })
    setkey(key)
    setSortingByString(true)
  }

  async function searchByIdHandler() {
    const searchUrl = '/api/admin/viewAdminDetailById/' + searchId
    try {
      const { data } = await axios.get(searchUrl)
      setSearchData([data])
      setIsSearchData(true)
    } catch (err) {
      setIsSearchData(true)
    }
  }

  //sort data from column header we click
  function sortDataHandler(key) {
    // console.log('sort data from ' + key)
    setAdmins(
      admins.sort((a, b) =>
        direction[key] === 'asc'
          ? parseFloat(a[key]) - parseFloat(b[key])
          : parseFloat(b[key]) - parseFloat(a[key])
      )
    )
    setDirection({
      [key]: direction[key] === 'asc' ? 'des' : 'asc',
    })
    // console.log(direction[key])
  }

  //=================================================================Return =========================================================//

  return (
    <PageHeader
      title="Admin"
      subTitle="All Admin List"
      open={open}
      width={width}
    >
      {/* {setMessage && (
        <PopupMessage message={message} handleClose={() => setMessage('')} />
      )} */}
      {deleteAdmin && (
        <PopupMessage
          message={'Are you sure you want to delete ' + deleteId + ' Admin'}
          action={() => deleteHandler(deleteId)}
          handleClose={() => setDeleteAdmin(false)}
        />
      )}
      <div
        className={`flex justify-center z-50 mt-32  ${
          loading ? 'show' : 'hidden'
        } 
        } `}
      >
        <CircularProgress />
      </div>
      <FormContainer
        className={`grid grid-cols-1 gap-x-4 mb-3 md:grid-cols-2 md:ml-2 ${
          loading ? 'hidden' : 'show'
        }`}
        width={width}
      >
        <FormInput
          label="Search By Id"
          values={searchId}
          name="searchId"
          onChange={(e) => setSearchId(e.target.value)}
        />
        <div className="space-x-4">
          <SButton
            size={200}
            green
            halfresponsive
            style={{ marginTop: '28px' }}
            onClick={searchByIdHandler}
          >
            Search
          </SButton>
          <SButton size={200} red halfresponsive>
            Reset
          </SButton>
        </div>
      </FormContainer>

      <TableContainer
        width={width}
        className={`${loading ? 'hidden' : 'show'}`}
      >
        <h1 className="text-center my-5">All Admin List</h1>

        <TableStyle width={width}>
          <thead>
            <tr>
              <th className="smallSize">
                <span className="flex space-x-2">
                  <span className="flex items-center">ID</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => sortDataHandler('id')}
                  >
                    {!direction['id'] ? (
                      <MdSwapVert size={25} />
                    ) : direction['id'] === 'asc' ? (
                      <MdArrowUpward size={20} />
                    ) : (
                      <MdArrowDownward size={20} />
                    )}
                  </span>
                </span>
              </th>
              <th className="mediumSize">
                <span className="flex space-x-2">
                  <span className="flex items-center">Name</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => sortDataByStringHandler('fname')}
                  >
                    {!direction['fname'] ? (
                      <MdSwapVert size={25} />
                    ) : direction['fname'] === 'asc' ? (
                      <MdArrowUpward size={20} />
                    ) : (
                      <MdArrowDownward size={20} />
                    )}
                  </span>
                </span>
              </th>
              <th>
                <span className="flex space-x-2">
                  <span className="flex items-center">Contact Number</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => sortDataHandler('contactNumber')}
                  >
                    {!direction['contactNumber'] ? (
                      <MdSwapVert size={25} />
                    ) : direction['contactNumber'] === 'asc' ? (
                      <MdArrowUpward size={25} />
                    ) : (
                      <MdArrowDownward size={25} />
                    )}
                  </span>
                </span>
              </th>
              <th className="emailSize">
                <span className="flex space-x-2">
                  <span className="flex items-center">Email</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => sortDataByStringHandler('email')}
                  >
                    {!direction['email'] ? (
                      <MdSwapVert size={25} />
                    ) : direction['email'] === 'asc' ? (
                      <MdArrowUpward size={20} />
                    ) : (
                      <MdArrowDownward size={20} />
                    )}
                  </span>
                </span>
              </th>
              <th>TOTAL EARNING</th>
              <th className="bigSize">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {message && message}
            {(isSearchData ? searchData : admins).map(
              ({
                id,
                fname,
                mname,
                lname,
                contactNumber,
                email,
                totalEarning,
              }) => (
                <tr key={id}>
                  <td className="smallSize">{id}</td>
                  <td>{`${fname} ${mname} ${lname} `}</td>
                  <td>{contactNumber}</td>
                  <td>{email}</td>
                  <td>{totalEarning}</td>
                  <td className="bigSize">
                    <SButton
                      p={2}
                      green
                      onClick={() => history.push('adminDetail/' + id)}
                    >
                      Details
                    </SButton>
                    <SButton
                      p={2}
                      blue
                      onClick={() => history.push(`updateAdmin/${id}`)}
                    >
                      Update
                    </SButton>
                    <SButton
                      p={2}
                      red
                      onClick={() => {
                        setDeleteAdmin(true)
                        setDeleteId(id)
                      }}
                    >
                      Delete
                    </SButton>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </TableStyle>
      </TableContainer>
    </PageHeader>
  )
}

export default AdminList

const FormContainer = styled.div`
  @media (min-width: 1024px) {
    grid-template-columns: 400px 1fr;
  }
`

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 6px;

  /* Styling scrollbar */
  ::-webkit-scrollbar {
    width: 20px;
    height: 15px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #a5aaad;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #7f9289;
    border-radius: 10%;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a5aaad;
  }
`
