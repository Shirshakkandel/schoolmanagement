import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useForm from '../../components/customeHook/useForm'
import { SButton } from '../../components/UI/SButton.styles'
import FormContainer from '../../components/UI/Form/FormContainer'
import { FormInput, SelectInput } from '../../components/UI/Form/FormInput'
import PageHeader from '../../components/UI/PageHeader'
import { useWindowSize } from '../../globalState/globalState'
import Adminvalidation from '../../validation/adminValidation'

function AddAdmin({ open, updateStatus, idData }) {
  const width = useWindowSize()
  const [message, setMessage] = useState()

  const [addAdmin, setAddAdmin] = useState({
    address: '',
    bloodGroup: '',
    caste: '',
    contactNumber: '',
    dob: '',
    email: '',
    emergencyContactNumber: '',
    ethnicity: '',
    fatherCitizenShipNumber: '',
    fatherName: '',
    fname: '',
    gender: '',
    joiningDate: '',
    leaveDate: '',
    lname: '',
    mname: '',
    motherCitizenShipNumber: '',
    motherName: '',
    motherTongue: '',
    religion: '',
    totalEarning: '',
  })

  //fill addAdmin field if updateState is true
  useEffect(() => {
    setAddAdmin({
      address: updateStatus ? idData.address : '',
      bloodGroup: updateStatus ? idData.bloodGroup : '',
      caste: updateStatus ? idData.caste : '',
      contactNumber: updateStatus ? idData.contactNumber : '',
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
      totalEarning: updateStatus ? idData.totalEarning : '',
    })
  }, [idData, updateStatus])

  function resetHandler() {
    setAddAdmin({
      address: '',
      bloodGroup: '',
      caste: '',
      contactNumber: '',
      dob: '',
      email: '',
      emergencyContactNumber: '',
      ethnicity: '',
      fatherCitizenShipNumber: '',
      fatherName: '',
      fname: '',
      gender: '',
      joiningDate: '',
      leaveDate: '',
      lname: '',
      mname: '',
      motherCitizenShipNumber: '',
      motherName: '',
      motherTongue: '',
      religion: '',
      totalEarning: '',
    })

    setMessage('')
  }

  const { handleChange, values, handleSubmit, errors, setErrors } = useForm(
    updateStatus ? updateAdminHandler : addAdminHandler,
    addAdmin,
    setAddAdmin,
    Adminvalidation
  )

  async function addAdminHandler() {
    const postUrl = `/api/admin/addNewAdminDetail`
    try {
      let { data } = await axios.post(
        postUrl,
        {
          ...addAdmin,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      console.log(data)
      if (data) {
        setMessage('New Admin Added')
        setAddAdmin(data)
      }
    } catch (err) {
      setErrors('Network Error cannot add New Admin')
    }
  }

  async function updateAdminHandler() {
    const updateUrl = `/api/admin/updateAdminDetail/${idData.id}`
    try {
      const { data } = await axios.put(
        updateUrl,
        { ...addAdmin },
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

  return (
    <PageHeader
      title="Admin"
      subTitle={updateStatus ? 'Update Admin' : 'Add New Admin'}
      open={open}
      width={width}
      onePageTitle={updateStatus ? 'Update Admin' : 'Add New Admin'}
    >
      <form noValidate onSubmit={handleSubmit}>
        <FormContainer>
          <FormInput
            label="First Name *"
            value={values.fname}
            name="fname"
            onChange={handleChange}
            errors={errors.fname}
          />
          <FormInput
            label="Middle Name *"
            value={values.mname}
            name="mname"
            onChange={handleChange}
            errors={errors.mname}
          />
          <FormInput
            label="last Name *"
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
          />

          <FormInput
            label="Contanct Number *"
            value={values.contactNumber}
            name="contactNumber"
            onChange={handleChange}
            errors={errors.contactNumber}
          />

          <FormInput
            label="Emergency Contanct Number *"
            value={values.emergencyContactNumber}
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
          />

          <FormInput
            value={values.religion}
            label="Religion *"
            name="religion"
            onChange={handleChange}
          />

          <FormInput
            value={values.joiningDate}
            label="Joining Date *"
            name="joiningDate"
            type="date"
            onChange={handleChange}
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
            type="number"
            name="totalEarning"
            onChange={handleChange}
            errors={errors.totalEarning}
          />
        </FormContainer>
        <SButton halfresponsive blue size={200}>
          {updateStatus ? 'Update' : 'Save'}
        </SButton>
        {!updateStatus && (
          <SButton
            halfresponsive
            yellow
            size={200}
            type="button"
            onClick={resetHandler}
          >
            Reset
          </SButton>
        )}

        {message && <p className="text-green-500">{message}</p>}
      </form>
    </PageHeader>
  )
}

export default AddAdmin
