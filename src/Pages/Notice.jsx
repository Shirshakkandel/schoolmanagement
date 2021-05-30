import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import useForm from '../components/customeHook/useForm'
import { FormInput } from '../components/UI/Form/FormInput'
import Loader from '../components/UI/Loader'
import Model from '../components/UI/Model'
import PageHeader from '../components/UI/PageHeader'
import { SButton } from '../components/UI/SButton.styles'
import { useWindowSize } from '../globalState/globalState'
import noticevalidation from '../validation/noticeValidation'

export default function Notice({ open }) {
  const width = useWindowSize()
  const [idData, setIdData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const [message, setMessage] = useState('')
  const [notice, setNotice] = useState([])
  const fiveNotice = notice.slice(0, 5)
  const [updateId, setUpdateId] = useState()

  const [updateStatus, setUpdateStatus] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [searchField, setSearchField] = useState({
    searchDate: '',
    searchTitle: '',
  })
  const [searchData, setSearchData] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [newnotice, setNewNotice] = useState({
    date: '',
    details: '',
    postedBy: '',
    title: '',
  })
  const { handleChange, values, handleSubmit, errors, setErrors, setValues } =
    useForm(
      updateStatus ? updateNotice : addNotice,
      newnotice,
      setNewNotice,
      noticevalidation
    )

  useEffect(() => {
    async function fetchAllNotice() {
      setLoading(true)
      const url = '/api/notice/viewAllNotice'
      try {
        const { data } = await axios.get(url)
        if (data) {
          setNotice(data)
          setLoading(false)
        }
      } catch (err) {}

      setLoading(false)
    }
    fetchAllNotice()
  }, [])

  useEffect(() => {
    setNewNotice({
      date: updateStatus ? idData.date : '',
      details: updateStatus ? idData.details : '',
      postedBy: updateStatus ? idData.postedBy : '',
      title: updateStatus ? idData.title : '',
    })
    setUpdateId(idData.id)
  }, [idData, updateStatus])

  async function update(id) {
    const noticeUrl = `/api/notice/viewNoticeById/${id}`
    try {
      const { data } = await axios.get(noticeUrl)
      setIdData(data)
      setUpdateStatus(true)
    } catch (err) {}
  }

  async function updateNotice() {
    const updateNoticeUrl = `/api/notice/updateNotice/${updateId}`
    try {
      const { data } = await axios.put(
        updateNoticeUrl,
        { ...newnotice },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (data) {
        setMessage(`Notice with notice id ${updateId} is updated`)
      }
    } catch (err) {}
  }

  async function addNotice() {
    const addUrl = '/api/notice/addNewNoticeDetail'
    try {
      setIsSubmiting(true)
      const { data } = await axios.put(
        addUrl,
        { ...newnotice },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (data) {
        setMessage('New Notice has been Added')
        setIsSubmiting(false)
        window.location.reload()
      }
    } catch (err) {
      setMessage(err.response.data.message)
      setIsSubmiting(false)
    }
  }

  async function deleteHandler() {
    const deleteUrl = `/api/notice/deleteNoticeById/${deleteId}`
    try {
      await axios.delete(deleteUrl)
      window.location.reload()
    } catch (err) {}
  }

  async function searchHandler(e) {
    e.preventDefault()
    setIsSearch(true)
    setSearchLoading(true)
    const dateUrl = `/api/notice/searchByDate/${searchField.searchDate}`
    const titleUrl = `/api/notice/searchByTitle/${searchField.searchTitle}`
    if (searchField.searchDate) {
      setLoading(true)
      try {
        const { data } = await axios.get(dateUrl)
        if (data) {
          setSearchData([...searchData, ...data])
          setLoading(false)
          setSearchLoading(false)
        }
      } catch (error) {
        setLoading(false)
        setSearchLoading(false)
      }
    }

    if (searchField.searchTitle) {
      setLoading(true)
      try {
        const { data } = await axios.get(titleUrl)
        if (data) {
          setSearchData([...searchData, ...data])
          setLoading(false)
          setSearchLoading(false)
        }
      } catch (error) {
        setLoading(false)
        setSearchLoading(false)
      }
    }

    setSearchLoading(false)
  }

  function agoHandler(time) {
    const date = new Date()
    const noticedate = new Date(time)
    let diff = (date.getTime() - noticedate.getTime()) / 1000

    if (diff < 60) {
      let ago = `${Math.floor(diff)} seconds ago`
      return ago
    } else if (diff < 60 * 60) {
      let diff = diff / 60
      let ago = `${Math.floor(diff)} minutes ago`
      return ago
    } else if (diff < 60 * 60 * 24) {
      diff = diff / (60 * 60)
      let ago = `${Math.floor(diff)} Hours ago`
      return ago
    } else if (diff < 60 * 60 * 24 * 30) {
      diff = diff / (60 * 60 * 24)
      let ago = `${Math.floor(diff)} Days ago`
      return ago
    } else if (diff < 60 * 60 * 24 * 30 * 12) {
      diff = diff / (60 * 60 * 24 * 30)
      let ago = `${Math.floor(diff)} Months ago`
      return ago
    } else {
      diff = diff / (60 * 60 * 24 * 30 * 12)
      let ago = `${Math.floor(diff)} years ago`
      return ago
    }
  }

  function resetHandler() {
    setNewNotice({
      date: '',
      details: '',
      postedBy: '',
      title: '',
    })
    setMessage('')
  }

  function resetSearchHandler() {
    setSearchField({
      searchDate: '',
      searchTitle: '',
    })

    setIsSearch(false)
  }

  return (
    <PageHeader title="Notice" subTitle="All Notice" open={open} width={width}>
      <div className=" space-y-5 ">
        <form type="post" className="bg-gray-100 pb-2 " onSubmit={handleSubmit}>
          <div className="p-3 grid gap-x-6 grid-cols-1 md:grid-cols-2">
            <FormInput
              label="Title"
              value={values.title}
              name="title"
              onChange={handleChange}
              errors={errors.title}
            />

            <FormInput
              label="Details"
              value={values.details}
              name="details"
              errors={errors.details}
              onChange={handleChange}
            />
            <FormInput
              label="Posted By"
              value={values.postedBy}
              name="postedBy"
              errors={errors.postedBy}
              onChange={handleChange}
            />
            <FormInput
              label="Date"
              value={values.date}
              name="date"
              type="date"
              errors={errors.date}
              onChange={handleChange}
            />
          </div>
          <SButton
            green
            halfresponsive
            size={200}
            style={width >= 786 ? { marginRight: '30px' } : {}}
            className="inline-block"
          >
            <span>{updateStatus ? 'Update' : 'Submit'}</span>
            {isSubmiting && (
              <CircularProgress
                color="secondary"
                style={{
                  height: '20px',
                  width: '20px',
                  textAlign: 'center',
                  marginLeft: '20px',
                  marginTop: 'auto',
                }}
              />
            )}
          </SButton>
          <SButton
            type="button"
            red
            halfresponsive
            size={200}
            onClick={resetHandler}
          >
            Reset
          </SButton>
        </form>
        {message && <p>{message}</p>}

        <div className="bg-gray-100 p-3">
          <div className="font-extrabold">Notice Board</div>
          <form type="post" onSubmit={searchHandler}>
            <div className="grid grid-cols-1 grid-y-4 md:grid-cols-4 gap-x-4">
              {isDelete && (
                <Model
                  message={`Are you sure you want to delete ${deleteId} Notice`}
                  handleClose={() => setIsDelete(false)}
                  action={() => deleteHandler()}
                  actionWord="Yes"
                  cancel="No"
                />
              )}
              <FormInput
                name="searchDate"
                placeholder="Search By Date..."
                value={searchField.searchDate}
                onChange={(e) =>
                  setSearchField({ ...searchField, searchDate: e.target.value })
                }
              />

              <FormInput
                name="searchTitle"
                placeholder="Search By Title..."
                value={searchField.searchTitle}
                onChange={(e) =>
                  setSearchField({
                    ...searchField,
                    searchTitle: e.target.value,
                  })
                }
              />

              <SButton
                green
                responsive
                // size={200}
                style={
                  width >= 786
                    ? {
                        marginRight: '30px',
                        marginTop: '8px',
                        marginBottom: '8px',
                        width: '100%',
                      }
                    : {}
                }
                padding="6px"
                className="h-10 flex justify-center "
              >
                <span>Search</span>
                {/* {searchLoading && (
                  <CircularProgress
                    color="secondary"
                    style={{
                      height: '20px',
                      width: '20px',
                      textAlign: 'center',
                      marginLeft: '20px',
                      marginTop: 'auto',
                    }}
                  />
                )} */}
              </SButton>

              <SButton
                responsive
                type="button"
                style={
                  width >= 786
                    ? {
                        marginRight: '30px',
                        marginTop: '8px',
                        marginBottom: '8px',
                        width: '100%',
                      }
                    : {}
                }
                padding="6px"
                className="h-10 flex justify-center "
                onClick={resetSearchHandler}
              >
                Reset
              </SButton>
            </div>
          </form>

          <div className="body h-5/6 bg-gray-100 customeScrollbar overflow-y-auto">
            {loading ? (
              <Loader />
            ) : (
              (isSearch ? searchData : fiveNotice).map(
                ({
                  id,
                  date,
                  notice,
                  postedBy,
                  dateCreated,
                  details,
                  title,
                }) => {
                  return (
                    <div key={id} className="py-4">
                      <div className=" bg-blue-500 inline-block px-3 text-gray-300 rounded-full">
                        {date}
                      </div>
                      <div className=" font-bold font-serif mt-2">{title}</div>
                      <div className="py-1 font-bold text-center">{notice}</div>
                      <div className=" font-serif">{details}</div>
                      <div className="flex justify-between items-center">
                        <div
                          className="font-light mb-2"
                          style={{ flex: '0.4' }}
                        >
                          {postedBy} {`/ `}
                          {/* {Math.floor(
                            (nowDate.getTime() - dateCreate.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )} */}
                          {agoHandler(dateCreated)}
                        </div>
                        <div
                          style={{ flex: '0.6' }}
                          className=" align-bottom mb-2 ml-3"
                        >
                          <SButton
                            p={1}
                            size={80}
                            green
                            onClick={() => {
                              update(id)
                              window.scrollTo(0, 0)
                            }}
                          >
                            Update
                          </SButton>
                          <SButton
                            p={1}
                            size={80}
                            red
                            onClick={() => {
                              setIsDelete(true)
                              setDeleteId(id)
                            }}
                          >
                            Delete
                          </SButton>
                        </div>
                      </div>

                      <hr className="border-gray-600" />
                    </div>
                  )
                }
              )
            )}
          </div>
        </div>
      </div>
    </PageHeader>
  )
}
