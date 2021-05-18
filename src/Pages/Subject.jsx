import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useForm from '../components/customeHook/useForm'
import { SButton } from '../components/UI/Button.styles'
import DropDown from '../components/UI/DropDown'
import { FormInput } from '../components/UI/Form/FormInput'
import PopupMessage from '../components/UI/Model'
import PageHeader from '../components/UI/PageHeader'
import { TableStyle } from '../components/UI/TableStyle'
import { useWindowSize } from '../globalState/globalState'

export default function Subject({ open }) {
  const width = useWindowSize()
  const [fetchError, setFetchError] = useState('')
  const [allSubjects, setAllSubjects] = useState([])
  const [deletePopup, setDeletePopup] = useState(false)
  const [idData, setIdData] = useState({})
  const [updateState, setUpdateState] = useState(false)
  const [id, setId] = useState('')

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [subject, setSubject] = useState({
    subjectCode: null,
    subjectName: '',
  })
  const dropDownData = [
    { id: 1, label: '00521' },
    { id: 2, label: '00522' },
    { id: 3, label: ' 00523' },
    { id: 4, label: ' 00524' },
    { id: 5, label: '00525' },
  ]

  const { handleChange, values, handleSubmit, errors, setErrors, setValues } =
    useForm(
      updateState ? updateSubject : addNewSubject,
      // callBack,
      subject,
      setSubject,
      validate
    )

  //fill code and name if update button and update data is loaded
  useEffect(() => {
    setSubject({
      subjectCode: updateState ? idData.subjectCode : null,
      subjectName: updateState ? idData.subjectName : '',
    })
    setId(idData.id)
  }, [idData, updateState])

  //Fetch all subject
  useEffect(() => {
    async function fetAllSubject() {
      try {
        const { data } = await axios.get(`/api/Subject/viewAllSubjectDetail`)
        setAllSubjects(data)
      } catch (err) {
        setFetchError('Could not loads all subjects')
      }
    }
    fetAllSubject()
  }, [])

  async function updateSubject() {
    const { data } = await axios.put(
      `/api/Subject/updateSubjectDetail/${id}`,
      {
        ...subject,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (data) {
      setMessage(`Subject with ${id} is updated`)
      window.location.reload()
    } else {
      setMessage('Cannot update given subject')
    }
  }

  // Reset all data
  function reset() {
    setSubject({ subjectCode: null, subjectName: '' })
    setMessage('')
    setIdData({})
    setUpdateState(false)
    setErrors('')
  }

  //Add new Subject
  async function addNewSubject() {
    try {
      const { data } = await axios.post(
        '/api/Subject/addNewSubjectDetail',
        {
          ...subject,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(data)
      if (data) {
        setMessage('New Subject Added')
        setSubject(data)
        window.location.reload()
      } else {
        setMessage('New Subject is submitted')
      }
    } catch (err) {
      setMessage('Network error')
    }
  }

  //validation of subject goes here
  function validate(values) {
    let errors = {}
    if (!values.subjectCode) {
      errors.subjectCode = 'subject code is needed'
    }
    if (!values.subjectName.trim()) {
      errors.subjectName = 'subject Name is needed'
    }
    return errors
  }

  async function deleteSubject(id) {
    await axios.delete(`/api/Subject/deleteSubject/${id}`)
    window.location.reload()
  }

  async function update(id) {
    // console.log('Inside update page ' + id)
    try {
      const { data } = await axios.get(
        `/api/Subject/viewSubjectDetailById/${id}`
      )
      setIdData(data)
      setUpdateState(true)

      // console.log(idData)
    } catch (err) {
      setFetchError(`Canot fetch subject data of id ${id} `)
    }
  }

  return (
    <PageHeader
      width={width}
      title=" All Subject"
      subTitle="Subject"
      open={open}
    >
      <div className="flex flex-col space-y-5  md:flex-row md:space-x-4 md:space-y-0 ">
        <div style={{ flex: 0.4 }} className="bg-gray-100 p-3 h-1/2">
          <h1 className="font-bold my-2  text-center">
            {updateState ? 'Update' : 'Add New '}Subject
          </h1>

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Subject Name *"
              name="subjectName"
              value={values.subjectName}
              onChange={handleChange}
              errors={errors.subjectName}
            />
            <label className="pl-2">Select Code *</label>
            <DropDown
              options={dropDownData}
              id="id"
              label="label"
              prompt="Select Code ..."
              value={values.subjectCode}
              onChange={(val) => setValues({ ...values, subjectCode: val })}
            />
            {errors.subjectCode && (
              <p className="ml-1 font-semibold text-red-500">
                {errors.subjectCode}
              </p>
            )}
            <SButton bold green style={{ marginRight: '20px' }}>
              {updateState ? 'Update' : 'Save'}
            </SButton>

            <SButton type="button" onClick={reset} bold>
              Reset
            </SButton>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div style={{ flex: 0.6 }} className="bg-gray-100 p-3">
          <h1 className="font-bold p-1 my-2 text-center ">All Subject</h1>
          {deletePopup && (
            <PopupMessage
              popUp={deletePopup}
              message="Are you sure you want to delete?"
              handleClose={() => setDeletePopup(false)}
              action={() => deleteSubject(id)}
              cancel="Cancel"
            />
          )}
          <div className="overflow-x-auto mb-6">
            <TableStyle width={width}>
              <thead>
                <tr>
                  <th className="smallsize">Id</th>
                  <th>Subject Name</th>
                  <th>Date</th>
                  <th className="bigSize">Action</th>
                </tr>
              </thead>
              <tbody>
                {allSubjects.map(
                  ({ subjectCode, subjectName, dateCreated, id }) => {
                    const date = new Date(dateCreated)
                    return (
                      <tr key={id}>
                        <td className="smallsize">{subjectCode}</td>
                        <td>{subjectName}</td>
                        <td>{date.toDateString()}</td>
                        <td className="bigSize text-center md:text-left">
                          <span>
                            <SButton
                              size={65}
                              p={4}
                              green
                              onClick={() => update(id)}
                            >
                              Update
                            </SButton>

                            <SButton
                              size={65}
                              p={4}
                              red
                              onClick={() => {
                                setDeletePopup(true)
                                setId(id)
                              }}
                            >
                              Delete
                            </SButton>
                          </span>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </TableStyle>
          </div>
        </div>
      </div>
    </PageHeader>
  )
}
