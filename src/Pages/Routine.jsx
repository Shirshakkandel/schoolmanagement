import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useForm from '../components/customeHook/useForm'
import DropDown from '../components/UI/DropDown'
import FormContainer from '../components/UI/Form/FormContainer'
import { FormInput, SelectInput } from '../components/UI/Form/FormInput'
import PageHeader from '../components/UI/PageHeader'
import { SButton } from '../components/UI/SButton.styles'
import { useAllSubject } from '../globalState/AllSubject'
import { useWindowSize } from '../globalState/globalState'
import routineValidation from '../validation/routineValidation'

function Routine({ open, updateStatus, idData }) {
  const width = useWindowSize()

  const [message, setMessage] = useState('')
  const { allSubject } = useAllSubject()

  const [routine, setRoutine] = useState({
    date: '',
    day: '',
    grade: '',
    section: '',
    subjectCode: '',
    subjectName: '',
    teacherName: '',
    time: '',
  })

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    setErrors,
    setValues,
    isSubmitting,
    setIsSubmitting,
  } = useForm(
    updateStatus ? updateRoutine : addRoutine,
    routine,
    setRoutine,
    routineValidation
  )

  useEffect(() => {
    setRoutine({
      date: updateStatus ? idData.date : '',
      day: updateStatus ? idData.day : '',
      grade: updateStatus ? idData.grade : '',
      section: updateStatus ? idData.section : '',
      subjectName: updateStatus ? idData.subjectName : '',
      subjectCode: updateStatus ? idData.subjectCode : '',
      teacherName: updateStatus ? idData.teacherName : '',
      time: updateStatus ? idData.time : '',
    })
  }, [updateStatus, idData])

  async function updateRoutine() {
    const updateUrl = `/api/routine/updateRoutineDetail/${idData.id}`

    try {
      const { data } = await axios.put(
        updateUrl,
        { ...routine },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (data) {
        setMessage(`Routine with routine id  ${idData.id} is updated`)
        window.location.reload()
      }
    } catch (err) {
      // setErrors(err.response.data.message)
    }
  }

  async function addRoutine() {
    const addRoutineUrl = '/api/routine/addNewRoutineDetail'
    setIsSubmitting(true)
    try {
      const { data } = await axios.post(
        addRoutineUrl,
        { ...routine },
        { headers: { 'Content-Type': 'application/json' } }
      )
      if (data) {
        setIsSubmitting(false)
        setMessage('New Routine has been added')
      }
    } catch (err) {
      setIsSubmitting(false)
      setMessage('Adding Exam Schedule Fail')
    }
  }

  function resetHandler() {
    setRoutine({
      date: '',
      day: '',
      grade: '',
      section: '',
      subjectCode: '',
      subjectName: '',
      teacherName: '',
      time: '',
    })
    setIsSubmitting(false)
    setErrors([])
  }

  return (
    <PageHeader
      width={width}
      title="Routine"
      subTitle="Routine Page"
      open={open}
    >
      <form className="mb-6 p-2 bg-gray-100" onSubmit={handleSubmit}>
        <h1 className="text-center font-extrabold mb-2">
          {updateStatus ? 'Update Routine' : 'Add Routine'}
        </h1>
        <FormContainer>
          <FormInput
            label="Teacher Name *"
            name="teacherName"
            value={values.teacherName}
            onChange={handleChange}
            errors={errors.teacherName}
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
            label="Section"
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

          <FormInput
            label="Date *"
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            errors={errors.date}
          />

          <div className=" ">
            <label htmlFor="">Subject Name *</label>
            <DropDown
              options={allSubject}
              id="id"
              label="subjectName"
              prompt="Select subject..."
              value={values.subjectName}
              onChange={(val) => {
                const subjectName = (values.subjectName = val)
                setValues({
                  ...values,
                  subjectName,
                })
              }}
            />
            {errors.subjectName && (
              <p className=" text-red-400 m-1">{errors.subjectName}</p>
            )}
          </div>

          <div>
            <label htmlFor="">Subject Code *</label>
            <DropDown
              options={allSubject}
              id="id"
              label="subjectCode"
              prompt="Select subjectCode..."
              value={values.subjectCode}
              onChange={(val) => {
                const subjectCode = (values.subjectCode = val)
                setValues({
                  ...values,
                  subjectCode,
                })
              }}
            />
            {errors.subjectCode && (
              <p className=" text-red-400 m-1">{errors.subjectCode}</p>
            )}
          </div>

          <FormInput
            label="Day *"
            name="day"
            onChange={handleChange}
            value={values.day}
            errors={errors.day}
          />

          <SButton
            className="h-10 "
            style={
              width >= 786
                ? { width: '95%', marginTop: '30px' }
                : { width: '95%', marginTop: '30px' }
            }
          >
            <span>{updateStatus ? 'Update' : 'Submit'}</span>

            {isSubmitting && (
              <CircularProgress
                style={{
                  height: '15px',
                  width: '15px',
                  textAlign: 'center',
                  marginLeft: '15px',
                  marginTop: 'auto',
                  color: '#3f1c1c',
                }}
              />
            )}
          </SButton>
          <SButton
            type="button"
            className="h-10 "
            onClick={() => resetHandler()}
            red
            style={
              width >= 786
                ? { width: '95%', marginTop: '30px' }
                : { width: '95%' }
            }
          >
            Reset
          </SButton>
        </FormContainer>
        {message && <p className="font-bold pl-2 pb-2">{message}</p>}
      </form>
    </PageHeader>
  )
}

export default Routine
