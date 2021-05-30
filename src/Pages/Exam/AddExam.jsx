import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useForm from '../../components/customeHook/useForm'
import DropDown from '../../components/UI/DropDown'
import FormContainer from '../../components/UI/Form/FormContainer'
import { FormInput, SelectInput } from '../../components/UI/Form/FormInput'
import Loader from '../../components/UI/Loader'
import Model from '../../components/UI/Model'
import PageHeader from '../../components/UI/PageHeader'
import { SButton } from '../../components/UI/SButton.styles'
import { TableStyle } from '../../components/UI/TableStyle'
import { useAllSubject } from '../../globalState/AllSubject'
import { useWindowSize } from '../../globalState/globalState'
import examValidation from '../../validation/examValidation'
import Pagination from '../../config/Pagination'

function AllExam({ open }) {
  const { allSubject } = useAllSubject()
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [examSchedule, setExamSchedule] = useState([])
  const [idData, setIdData] = useState({})
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [updateStatus, setUpdateStatus] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [isSearchData, setIsSearchData] = useState(false)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(3)
  //get Current post
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = examSchedule.slice(indexOfFirstPost, indexOfLastPost)

  const [exam, setExam] = useState({
    date: '',
    examName: '',
    grade: '',
    section: '',
    time: '',
    subjectName: {
      id: null,
      subjectCode: '',
      subjectName: '',
    },
  })

  const [search, setSearch] = useState({
    searchDate: '',
    searchExamName: '',
    searchSubjectName: '',
  })

  const width = useWindowSize()

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    setErrors,
    setValues,
    setIsSubmitting,
  } = useForm(
    updateStatus ? updateExam : addExam,
    exam,
    setExam,
    examValidation
  )

  useEffect(() => {
    async function fetchExam() {
      setLoading(true)
      const examUrl = '/api/exam/viewAllExamDetail'
      try {
        const { data } = await axios.get(examUrl)
        if (data) {
          setLoading(false)
          setExamSchedule(data)
        }
      } catch (err) {
        setLoading(false)
      }
    }
    fetchExam()
  }, [])

  useEffect(() => {
    setExam({
      date: updateStatus ? idData.date : '',
      examName: updateStatus ? idData.examName : '',
      grade: updateStatus ? idData.grade : '',
      time: updateStatus ? idData.time : '',
      section: updateStatus ? idData.section : '',
      subjectName: {
        id: updateStatus ? idData.subjectName.id : null,
        subjectCode: updateStatus ? idData.subjectName.subjectCode : '',
        subjectName: updateStatus ? idData.subjectName.subjectName : '',
      },
    })
  }, [idData, updateStatus])

  async function addExam() {
    const addUrl = `/api/exam/addNewExamDetail`
    setSubmitLoading(true)
    try {
      const { data } = await axios.post(
        addUrl,
        { ...exam },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (data) {
        setSubmitLoading(false)
        setMessage('New exam  Schedule is Added')
      }
    } catch (err) {
      setSubmitLoading(false)
      setMessage('Adding Exam schedule Fail')
    }
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }

  async function updateExam() {
    setSubmitLoading(true)
    try {
      const updateUrl = `/api/exam/updateExamDetail/${idData.id}`
      const { data } = await axios.put(
        updateUrl,
        { ...exam },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (data) {
        setMessage('Exam detail is updated')
        setSubmitLoading(false)
      }
    } catch (err) {
      setMessage('Exam Update fail')
      setSubmitLoading(false)
    }
  }

  async function deleteExamHandler() {
    try {
      await axios.delete(`/api/exam/deleteExamById/${deleteId}`)
      window.location.reload()
    } catch (err) {}
  }

  function resetHandler() {
    setExam({
      date: '',
      examName: '',
      grade: '',
      section: '',
      time: '',
      subjectName: {
        id: null,
        subjectCode: '',
        subjectName: '',
      },
    })
    setIsSubmitting(false)
    setErrors('')
  }

  async function searchHandler(e) {
    e.preventDefault()
    setLoading(true)
    setIsSearchData(true)
    if (search.searchExamName) {
      let examUrl = `/api/exam/searchExamByExamName/${search.searchExamName.toLowerCase()}`
      try {
        let { data } = await axios.get(examUrl)
        if (data) {
          setSearchData(...searchData, data)
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
        setMessage(`${search.searchExamName} ExamName search is not Found`)
      }
    }

    if (search.searchSubjectName) {
      let subjectUrl = `/api/exam/searchExamBySubjectName/${search.searchSubjectName}`

      try {
        let { data } = await axios.get(subjectUrl)
        if (data) {
          setSearchData(data)
          setLoading(false)
          console.log(data)
        }
      } catch (err) {
        setLoading(false)
      }
    }

    if (search.searchDate) {
      alert('hello')
      let dateUrl = `/api/exam/searchExamByExamDate/${search.searchDate}`
      setLoading(true)
      try {
        let { data } = await axios.get(dateUrl)
        setSearchData(...searchData, data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    setLoading(false)
    !searchData && setMessage('Search Data is not Found')
  }

  function resetSearchHandler() {
    setSearch({
      searchDate: '',
      searchExamName: '',
      searchSubjectName: '',
    })
    setIsSearchData(false)
    setSearchData([])
  }
  return (
    <PageHeader open={open} title="Exam" subTitle="Add Exam" width={width}>
      <form
        action=""
        type="post"
        onSubmit={handleSubmit}
        className="mb-6 pb-2 bg-gray-100 p-2"
      >
        <h1 className="text-center font-extrabold mb-2">
          {updateStatus ? 'Update Exam ' : 'Add Exam'}
        </h1>
        <FormContainer>
          <FormInput
            label="Exam Name *"
            name="examName"
            value={values.examName}
            onChange={handleChange}
            errors={errors.examName}
          />
          <FormInput
            label="Date *"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            errors={errors.date}
          />
          <SelectInput
            value={values.grade}
            label="Grade *"
            name="grade"
            onChange={handleChange}
            options={[
              {
                id: 1,
                label: 'Please Select Class *',
                value: '',
              },
              { id: 2, label: 'Play', value: 'Play' },
              { id: 3, label: 'One', value: 'One' },
              { id: 4, label: 'Two', value: 'Two' },
              { id: 5, label: 'Three', value: 'Three' },
              { id: 6, label: 'Four', value: 'Four' },
              { id: 7, label: 'Five', value: 'Five' },
              { id: 8, label: 'Six', value: 'Six' },
              { id: 9, label: 'Seven', value: 'Seven' },
              { id: 10, label: 'Eight', value: 'Eight' },
              { id: 11, label: 'Nine', value: 'Nine' },
              { id: 12, label: 'Ten', value: 'Ten' },
            ]}
            errors={errors.grade}
          />
          <FormInput
            label="Section *"
            name="section"
            value={values.section}
            onChange={handleChange}
            errors={errors.section}
          />

          <FormInput
            label="Time *"
            name="time"
            value={values.time}
            onChange={handleChange}
            errors={errors.time}
          />
          <div
            className="mt-6 h-12"
            style={width >= 786 ? {} : { marginTop: '-2px' }}
          >
            <DropDown
              options={allSubject}
              id="id"
              label="subjectName"
              subjectCode="subjectCode"
              prompt="Select subject..."
              value={values.subjectName.subjectName}
              onChange={(val, id, subjectCode) => {
                let { subjectName } = values
                subjectName = {
                  subjectName: val,
                  id: id,
                  subjectCode: subjectCode,
                }
                setValues({
                  ...values,
                  subjectName,
                })
              }}
            />
            {errors.subjectName && (
              <p className=" text-red-500 mt-1">{errors.subjectName}</p>
            )}
          </div>

          <SButton
            className="h-11 flex justify-center "
            red
            style={
              width >= 786
                ? { width: '95%', marginTop: '30px' }
                : { width: '95%' }
            }
          >
            <div>{updateStatus ? 'Update' : 'Submit'}</div>
            {submitLoading && (
              <CircularProgress
                color="red"
                style={{
                  height: '20px',
                  width: '20px',
                  textAlign: 'center',
                  marginLeft: '30px',
                  marginTop: 'auto',
                  fontWeight: 'bold',
                }}
              />
            )}
          </SButton>

          <SButton
            className="h-11"
            type="button"
            style={
              width >= 786
                ? { width: '95%', marginTop: '30px' }
                : { width: '95%' }
            }
            onClick={() => resetHandler()}
          >
            Reset
          </SButton>
        </FormContainer>
        {message && <p className="m-2 to-red-200">{message}</p>}
      </form>

      <div className="bg-gray-100  p-2 ">
        <h1 className=" font-mono font-extrabold text-center m-3">
          All Exam Schedule
        </h1>
        <form onSubmit={searchHandler} type="post">
          <FormContainer col={5}>
            <FormInput
              placeholder="Search by Exam Name"
              name="searchExamName"
              value={search.searchExamName}
              onChange={(e) =>
                setSearch({ ...search, searchExamName: e.target.value })
              }
            />
            <FormInput
              placeholder="Search by Subject"
              name="subjectName"
              value={search.searchSubjectName}
              onChange={(e) =>
                setSearch({ ...search, searchSubjectName: e.target.value })
              }
            />

            <FormInput
              placeholder="Search By Date"
              name="searchDate"
              value={search.searchDate}
              onChange={(e) =>
                setSearch({ ...search, searchDate: e.target.value })
              }
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
              onClick={() => resetSearchHandler()}
            >
              Reset
            </button>
          </FormContainer>
        </form>
        {isDelete && (
          <Model
            message="Are you sure want to delete? "
            handleClose={() => setIsDelete(false)}
            action={deleteExamHandler}
            cancel="No"
            actionWord="Yes"
          />
        )}
        <div className="overflow-x-auto">
          <TableStyle>
            <thead>
              <th>Id</th>
              <th>Exam Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Section</th>
              <th>Time</th>
              <th>Date</th>
              <th>Action</th>
            </thead>

            <tbody>
              <Table
                posts={currentPosts}
                loading={loading}
                setIdData={setIdData}
                setUpdateStatus={setUpdateStatus}
                setIsDelete={setIsDelete}
                setDeleteId={setDeleteId}
                isSearchData={isSearchData}
                searchData={searchData}
              />
            </tbody>
          </TableStyle>
        </div>

        {!isSearchData && (
          <nav className="overflow-x-show">
            <Pagination
              postPerPage={postsPerPage}
              totalPosts={examSchedule.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        )}
      </div>
    </PageHeader>
  )
}

export default AllExam

export function Table({
  posts,
  loading,
  setIdData,
  setUpdateStatus,
  setIsDelete,
  setDeleteId,
  isSearchData,
  searchData,
}) {
  {
    return loading ? (
      <Loader />
    ) : (
      (isSearchData ? searchData : posts).map((exam) => (
        <tr key={exam.id}>
          <td>{exam.id}</td>
          <td>{exam.examName}</td>
          <td>{exam.subjectName?.subjectName}</td>
          <td>{exam.grade}</td>
          <td>{exam.section}</td>
          <td>{exam.time}</td>
          <td>{exam.date}</td>
          <td>
            <SButton p={1} green>
              Detail
            </SButton>
            <SButton
              p={1}
              blue
              onClick={() => {
                setIdData(exam)
                setUpdateStatus(true)
              }}
            >
              Update
            </SButton>
            <SButton
              red
              p={1}
              onClick={() => {
                setIsDelete(true)
                setDeleteId(exam.id)
              }}
            >
              Delete
            </SButton>
          </td>
        </tr>
      ))
    )
  }
}
