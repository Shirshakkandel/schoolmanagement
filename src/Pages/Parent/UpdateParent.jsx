import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useForm from '../../components/customeHook/useForm'
import { FormInput, SelectInput } from '../../components/UI/Form/FormInput'
import PageHeader from '../../components/UI/PageHeader'
import { useLoading } from '../../globalState/globalState'
import validate from '../../validation/parentValidation'

export default function UpdateParent({ width, open }) {
  const [parentDetail, setParentDetail] = useState({})
  const [loading, setLoading] = useLoading()
  const [message, setMessage] = useState('')

  const { handleChange, handleSubmit, values, errors } = useForm(
    update,
    parentDetail,
    setParentDetail,
    validate
  )

  console.log(values.mname)

  const { id } = useParams()
  useEffect(() => {
    async function fetchSinglParentDetail() {
      setLoading(true)
      const { data } = await axios.get(`/api/parent/viewParentDetailById/${id}`)
      if (data) {
        setParentDetail(data)
        setLoading(false)
      }
    }
    fetchSinglParentDetail()
  }, [])

  async function update() {
    try {
      const data = await axios.put(
        `/api/parent/updateParentDetail/${id}`,
        {
          ...values,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (data) {
        setMessage('form Updated')
      } else {
        setMessage('Parent detail not updated')
      }
    } catch (err) {
      setMessage('Network error')
    }
  }

  return (
    <PageHeader
      title="Parent"
      subTitle="Parent Update Form"
      width={width}
      open={open}
    >
      {loading ? (
        <div className="flex justify-center mt-32 h-screen">
          <CircularProgress />
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            />
            <FormInput
              label="Children Names *"
              value={values.childrenNames}
              name="childrenNames"
              onChange={handleChange}
            />

            <FormInput
              label="Contanct Number *"
              value={values.contactNumber}
              name="contactNumber"
              onChange={handleChange}
              errors={errors.contactNumber}
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
              value={values.occuption}
              label="Occupation *"
              name="occuption"
              onChange={handleChange}
              errors={errors.occuption}
            />
          </div>
          <button
            type="submit"
            className=" w-full block bg-yellow-300 p-2 md:w-40 border-none"
          >
            Submit
          </button>
          {message && <p className="text-green-500">{message}</p>}
        </form>
      )}
    </PageHeader>
  )
}
