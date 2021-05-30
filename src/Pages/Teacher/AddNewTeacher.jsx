import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useForm from '../../components/customeHook/useForm'
import DropDown from '../../components/UI/DropDown'
import FormContainer from '../../components/UI/Form/FormContainer'
import { FormInput, SelectInput } from '../../components/UI/Form/FormInput'
import PageHeader from '../../components/UI/PageHeader'
import { SButton } from '../../components/UI/SButton.styles'
import { useWindowSize } from '../../globalState/globalState'
import teacherValidation from '../../validation/teacherValidation'

export default function AddNewTeacher({ open, updateStatus, idData }) {
  const width = useWindowSize()
  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [teacherField, setAddTeacherField] = useState({
    address: '',
    bloodGroup: '',
    caste: '',
    contactNumber: '',
    disabilityName: '',
    disable: Boolean,
    dob: '',
    email: '',
    emergencyContactNumber: '',
    ethnicity: '',
    fatherCitizenShipNumber: '',
    fatherName: '',
    fname: '',
    gender: '',
    grade: '',
    isClassTeacher: '',
    joiningDate: '',
    leaveDate: '',
    lname: '',
    mname: '',
    motherCitizenShipNumber: '',
    motherName: '',
    motherTongue: '',
    religion: '',
    section: '',
    subject: [
      {
        dateCreated: '2021-05-19T05:09:16.674Z',
        dateUpdated: '2021-05-19T05:09:16.674Z',
        id: 0,
        subjectCode: '',
        subjectName: '',
      },
    ],
    totalEarning: '',
  })

  const { handleChange, values, handleSubmit, setValues, errors, setErrors } =
    useForm(
      updateStatus ? updateTeacher : addTeacher,
      teacherField,
      setAddTeacherField,
      teacherValidation
    )

  useEffect(() => {
    const subjectUrl = '/api/Subject/viewAllSubjectDetail'
    async function fetchSubject() {
      try {
        setLoading(true)
        const { data } = await axios.get(subjectUrl)
        setSubject(data)
      } catch (err) {
        setError(err.response.data.message)
      }
    }
    fetchSubject()
  }, [])

  useEffect(() => {
    setAddTeacherField({
      address: updateStatus ? idData.address : '',
      bloodGroup: updateStatus ? idData.bloodGroup : '',
      caste: updateStatus ? idData.caste : '',
      contactNumber: updateStatus ? idData.contactNumber : '',
      disabilityName: updateStatus ? idData.disabilityName : '',
      disable: updateStatus ? idData.diasable : Boolean,
      dob: updateStatus ? idData.dob : '',
      email: updateStatus ? idData.email : '',
      emergencyContactNumber: updateStatus ? idData.emergencyContactNumber : '',
      ethnicity: updateStatus ? idData.ethnicity : '',
      fatherCitizenShipNumber: updateStatus
        ? idData.fatherCitizenShipNumber
        : '',
      fatherName: updateStatus ? idData.fatherName : '',
      fname: updateStatus ? idData.fname : '',
      gender: updateStatus ? idData.gender : '',
      grade: updateStatus ? idData.grade : '',
      isClassTeacher: updateStatus ? idData.isClassTeacher : '',
      joiningDate: updateStatus ? idData.joiningDate : '',
      leaveDate: updateStatus ? idData.leaveDate : '',
      lname: updateStatus ? idData.lname : '',
      mname: updateStatus ? idData.mname : '',
      motherCitizenShipNumber: updateStatus
        ? idData.motherCitizenShipNumber
        : '',
      motherName: updateStatus ? idData.motherName : '',
      motherTongue: updateStatus ? idData.motherTongue : '',
      religion: updateStatus ? idData.religion : '',
      section: updateStatus ? idData.section : '',
      totalEarning: updateStatus ? idData.totalEarning : '',
      subject: updateStatus
        ? idData.subject
        : [
            {
              dateCreated: '2021-05-19T05:09:16.674Z',
              dateUpdated: '2021-05-19T05:09:16.674Z',
              id: 0,
              subjectCode: '',
              subjectName: '',
            },
          ],
    })
  }, [idData, updateStatus])

  async function addTeacher() {
    const url = '/api/teacher/addNewTeacherDetail'
    try {
      setLoading(true)

      const data = await axios.post(
        url,
        { ...teacherField },
        { header: { 'Content-Type': 'application/json' } }
      )

      if (data) {
        console.log(data)
        setMessage('New Teacher has been added')
      }
    } catch (err) {
      setMessage(err.response.data.message)
    }
  }

  async function updateTeacher() {
    const updateUrl = `/api/teacher/updateTeacherDetail/${idData.id}`
    try {
      const { data } = await axios.put(
        updateUrl,
        { ...teacherField },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (data) {
        setMessage(`Admin with ${idData.id} is updated`)
        window.location.reload()
      }
    } catch (err) {
      setErrors(err.response.data.message)
    }
  }

  function resetHandler() {
    setAddTeacherField({
      address: '',
      bloodGroup: '',
      caste: '',
      contactNumber: '',
      disabilityName: '',
      disable: Boolean,
      dob: '',
      email: '',
      emergencyContactNumber: '',
      ethnicity: '',
      fatherCitizenShipNumber: '',
      fatherName: '',
      fname: '',
      gender: '',
      grade: '',
      isClassTeacher: '',
      joiningDate: '',
      leaveDate: '',
      lname: '',
      mname: '',
      motherCitizenShipNumber: '',
      motherName: '',
      motherTongue: '',
      religion: '',
      section: '',
      subject: [
        {
          subjectCode: '',
          subjectName: '',
        },
      ],
      totalEarning: '',
    })
    setMessage('')
  }

  return (
    <PageHeader
      title="Teacher"
      subTitle="Add New Teacehr"
      open={open}
      width={width}
    >
      {console.log(idData?.fname)}
      <form noValidate onSubmit={handleSubmit} type="post">
        <FormContainer>
          <FormInput
            label="First Name *"
            value={values.fname}
            name="fname"
            onChange={handleChange}
            errors={errors.fname}
          />

          <FormInput
            label="Middle Name "
            value={values.mname}
            name="mname"
            onChange={handleChange}
          />

          <FormInput
            label="Last Name *"
            value={values.lname}
            name="lname"
            onChange={handleChange}
            errors={errors.lname}
          />

          <SelectInput
            label="Gender *"
            value={values.gender}
            name="gender"
            onChange={handleChange}
            options={[
              { label: 'Gender *', ovalue: '' },
              { label: 'Male', ovalue: 'Male' },
              { label: 'Female', ovalue: 'Female' },
              { label: 'Other', ovalue: 'Other' },
            ]}
            errors={errors.gender}
          />

          <FormInput
            label="Date of Birth *"
            value={values.dob}
            name="dob"
            type="date"
            onChange={handleChange}
            errors={errors.dob}
          />

          <FormInput
            label="Contanct Number *"
            value={values.contactNumber}
            name="contactNumber"
            type="number"
            onChange={handleChange}
            errors={errors.contactNumber}
          />

          <FormInput
            label="Emergency Contanct Number *"
            value={values.emergencyContactNumber}
            type="number"
            name="emergencyContactNumber"
            onChange={handleChange}
            errors={errors.emergencyContactNumber}
          />

          <SelectInput
            value={values.bloodGroup}
            label="Blood Group *"
            name="bloodGroup"
            onChange={handleChange}
            options={[
              { id: 1, label: 'Blood Group *', value: '' },
              { id: 2, label: 'A+', value: 'A+' },
              { id: 3, label: 'A-', value: 'A-' },
              { id: 4, label: 'B+', value: 'B+' },
              { id: 5, label: 'B-', value: 'B-' },
              { id: 6, label: 'O+', value: 'O+' },
              { id: 7, label: 'O-', value: 'O-' },
            ]}
            errors={errors.bloodGroup}
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
            value={values.section}
            label="Section *"
            name="section"
            onChange={handleChange}
            errors={errors.section}
          />

          <SelectInput
            value={values.isClassTeacher}
            label="Class Teacher *"
            name="isClassTeacher"
            onChange={handleChange}
            options={[
              { label: 'Is Class Teacher', value: '' },
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
            errors={errors.isClassTeacher}
          />

          <FormInput
            value={values.email}
            label="Email *"
            name="email"
            type="email"
            onChange={handleChange}
            errors={errors.email}
          />

          <FormInput
            value={values.address}
            label="Address *"
            name="address"
            onChange={handleChange}
            errors={errors.address}
          />

          <FormInput
            value={values.fatherName}
            label="Father Name *"
            name="fatherName"
            onChange={handleChange}
            errors={errors.fatherName}
          />
          <FormInput
            value={values.fatherCitizenShipNumber}
            label="Father Citizenship Number "
            name="fatherCitizenShipNumber"
            onChange={handleChange}
            errors={errors.fatherCitizenShipNumber}
          />
          <FormInput
            value={values.motherName}
            label="Mother Name"
            name="motherName"
            onChange={handleChange}
          />
          <FormInput
            value={values.motherCitizenShipNumber}
            label="Mother Citizenship Number"
            name="motherCitizenShipNumber"
            onChange={handleChange}
          />

          <SelectInput
            label="Disable *"
            value={values.disable}
            name="disable"
            onChange={handleChange}
            options={[
              { label: 'Disable *', value: '' },
              { label: 'True', value: 'true' },
              { label: 'False', value: 'false' },
            ]}
            errors={errors.disable}
          />

          <FormInput
            value={values.disabilityName}
            label="Disability Name "
            name="disabilityName"
            onChange={handleChange}
            errors={errors.disabilityName}
          />
          <FormInput
            value={values.motherTongue}
            label="Mother Tongue *"
            name="motherTongue"
            onChange={handleChange}
            errors={errors.motherTongue}
          />
          <FormInput
            value={values.caste}
            label="Caste *"
            name="caste"
            onChange={handleChange}
            errors={errors.caste}
          />
          <FormInput
            value={values.ethnicity}
            label="Ethnicity"
            name="ethnicity"
            onChange={handleChange}
            errors={errors.ethnicity}
          />
          <FormInput
            value={values.religion}
            label="Religion *"
            name="religion"
            onChange={handleChange}
            errors={errors.religion}
          />

          <FormInput
            value={values.joiningDate}
            label="Joining Date *"
            name="joiningDate"
            type="date"
            onChange={handleChange}
            errors={errors.joiningDate}
          />

          <FormInput
            value={values.leaveDate}
            label="Leave Date *"
            name="leaveDate"
            type="date"
            onChange={handleChange}
          />

          <FormInput
            value={values.totalEarning}
            label="Total Earning *"
            name="totalEarning"
            type="number"
            onChange={handleChange}
            errors={errors.totalEarning}
          />

          <div>
            <label htmlFor="">Subject</label>
            <DropDown
              options={subject}
              id="subjectCode"
              label="subjectName"
              prompt="Select Subject ..."
              value={values.subject[0]?.subjectName}
              // onChange={(val, id) => {
              //   setDropDownValue(val)
              //   setDropDownId(id)
              // }}
              onChange={(val, id) => {
                // setValues((state) => {
                //   state.subject[0].subjectName = val
                //   state.subject[0].subjectCode = id
                //   return state
                // })
                const { subject } = values
                //subject.push({ subjectName: val, subjectCode: id })
                subject[0] = {
                  subjectName: val,
                  subjectCode: id,
                }

                setValues({
                  ...values,
                  subject,
                })
              }}
            />
          </div>
        </FormContainer>

        <SButton type="submit">Submit</SButton>
        <SButton red type="button" onClick={() => resetHandler()}>
          Reset
        </SButton>
        {message && <p className="my-3">{message}</p>}
      </form>
    </PageHeader>
  )
}
