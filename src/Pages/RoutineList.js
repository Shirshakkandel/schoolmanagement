import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import FormContainer from '../components/UI/Form/FormContainer'
import { FormInput } from '../components/UI/Form/FormInput'
import Model from '../components/UI/Model'
import PageHeader from '../components/UI/PageHeader'
import { SButton } from '../components/UI/SButton.styles'
import { TableStyle } from '../components/UI/TableStyle'
import Pagination from '../config/Pagination'
import { useWindowSize } from '../globalState/globalState'

function RoutineList({ open }) {
  const width = useWindowSize()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(1)
  const [routine, setRoutine] = useState([])
  const [searchData, setSearchData] = useState([])
  const [isSearchData, setIsSearchData] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const history = useHistory()
  const [deleteRoutine, setDeleteRoutine] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(1)
  //get Current post
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = routine.slice(indexOfFirstPost, indexOfLastPost)

  const [search, setSearch] = useState({
    searchByDay: '',
    searchByGrade: '',
    searchBySection: '',
  })
  useEffect(() => {
    async function fetchRoutine() {
      const routineUrl = '/api/routine/viewAllRoutineDetail'
      setLoading(true)
      try {
        const { data } = await axios.get(routineUrl)
        if (data) {
          setRoutine(data)
          setLoading(false)
        }
      } catch (err) {
        setMessage('Cannot fetch Routine detail')
      }
    }
    fetchRoutine()
  }, [])

  async function deleteHandler(id) {
    const deleteUrl = `/api/routine/deleteRoutineDetail/${id}`
    try {
      await axios.delete(deleteUrl)
      window.location.reload()
    } catch (err) {}
  }

  async function searchHandler(e) {
    e.preventDefault()
    if (search.searchByDay) {
      try {
        let { data } = await axios.get(
          `/api/routine/searchRoutineByDay/${search.searchByDay}`
        )
        setSearchData(data)
        setIsSearchData(true)
      } catch (err) {
        setIsSearchData(true)
      }
    }
    if (search.searchByGrade) {
      try {
        let { data } = await axios.get(
          `/api/routine/searchRoutineByGrade/${search.searchByGrade}`
        )

        setSearchData([...searchData, ...data])

        setIsSearchData(true)
      } catch (err) {
        setIsSearchData(true)
      }
    }
    if (search.searchBySection) {
      try {
        let { data } = await axios.get(
          `/api/routine/searchRoutineSection/${search.searchSection}`
        )
        // const data = datas.map((data) => data)
        setSearchData(data)
        setIsSearchData(true)
      } catch (err) {
        setIsSearchData(true)
      }
    }
  }

  console.log(searchData)
  function resetHandler() {
    setSearch({
      searchByDay: '',
      searchByGrade: '',
      searchBySection: '',
    })
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }
  return (
    <PageHeader
      title="Routine"
      subTitle="Routine List"
      open={open}
      width={width}
      onePageTitle="Routine List"
    >
      {deleteRoutine && (
        <Model
          message={
            'Are you sure you want to delete id no ' + deleteId + ' Routine'
          }
          action={() => deleteHandler(deleteId)}
          handleClose={() => setDeleteRoutine(false)}
          cancel="No"
          actionWord="Yes"
        />
      )}
      <div className="bg-gray-100 mb-3">
        <form type="post" onSubmit={searchHandler}>
          <FormContainer col={5}>
            <FormInput
              placeholder="Search by Day"
              name="searchByDay"
              value={search.searchByDay}
              onChange={(e) =>
                setSearch({ ...search, searchByDay: e.target.value })
              }
            />

            <FormInput
              placeholder="Search by Grade"
              name="searchByGrade"
              value={search.searchByGrade}
              onChange={(e) =>
                setSearch({ ...search, searchByGrade: e.target.value })
              }
            />

            <FormInput
              placeholder="Search by Section"
              name="searchBySection"
              value={search.searchBySection}
              onChange={(e) =>
                setSearch({
                  ...search,
                  searchBySection: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className=" w-full block bg-yellow-600 h-10 p-2 my-2 text-gray-100  md:w-50  focus:outline-none  focus:bg-opacity-80"
            >
              Search
            </button>

            <button
              type="button"
              className=" w-full block bg-red-600 h-10 p-2 my-2 text-gray-100  md:w-50  focus:outline-none  focus:bg-opacity-80"
              onClick={() => resetHandler()}
            >
              Reset
            </button>
          </FormContainer>
        </form>

        <div className="bg-gray-100 p-2">
          <h1 className="text-center font-bold mb-2">Routine List</h1>
          <div className="overflow-x-auto">
            <TableStyle>
              <thead>
                <th>Id</th>
                <th>Subject Name</th>
                <th>Subject Code</th>
                <th>Date</th>
                <th>Day</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Teacher Name</th>
                <th>Time</th>
                <th className="bigSize">Action</th>
              </thead>

              <tbody>
                {(isSearchData ? searchData : currentPosts).map((single) => (
                  <tr key={single.id}>
                    <td>{single.id}</td>
                    <td>{single.subjectName}</td>
                    <td>{single.subjectCode}</td>
                    <td>{single.date}</td>
                    <td>{single.day}</td>
                    <td>{single.grade}</td>
                    <td>{single.section}</td>
                    <td>{single.teacherName}</td>
                    <td>{single.time}</td>
                    <td className="bigSize">
                      <SButton
                        p={1}
                        onClick={() => {
                          history.push(`/updateroutine/${single.id}`)
                        }}
                      >
                        Update
                      </SButton>

                      <SButton
                        p={1}
                        red
                        onClick={() => {
                          setDeleteRoutine(true)
                          setDeleteId(single.id)
                        }}
                      >
                        Delete
                      </SButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableStyle>
          </div>
          {!isSearchData && (
            <Pagination
              postPerPage={postsPerPage}
              totalPosts={routine.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </PageHeader>
  )
}

export default RoutineList
