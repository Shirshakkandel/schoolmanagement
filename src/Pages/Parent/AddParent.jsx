import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  FormInput,
  SelectInput,
} from '../../components/UI/Form/FormInput'

function AddParent({ title, subTitle, open, width }) {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [addParent, setAddParent] = useState({
    address: '',
    bloodGroup: '',
    caste: '',
    childrenNames: '',
    contactNumber: '',
    dob: '',
    email: '',
    ethnicity: '',
    fatherCitizenShipNumber: '',
    fatherName: '',
    fname: '',
    gender: '',
    lname: '',
    mname: '',
    motherCitizenShipNumber: '',
    motherName: '',
    motherTongue: '',
    occuption: '',
    religion: '',
  })
  const resetParentField = {
    address: '',
    bloodGroup: '',
    caste: '',
    childrenNames: '',
    contactNumber: '',
    dob: '',
    email: '',
    ethnicity: '',
    fatherCitizenShipNumber: '',
    fatherName: '',
    fname: '',
    gender: '',
    lname: '',
    mname: '',
    motherCitizenShipNumber: '',
    motherName: '',
    motherTongue: '',
    occuption: '',
    religion: '',
  }

  function handlerChange(e) {
    setAddParent({ ...addParent, [e.target.name]: e.target.value })
  }
  function addParentHandler(e) {
    e.preventDefault()
    setIsSubmitting(false)
    setMessage('')
    setErrors(validateField())
    console.log(errors)
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      console.log('inside eror free')
      add()
    }
  }, [errors])

  async function add() {
    try {
      const data = await axios.post(
        '/api/parent/addNewParentDetail',
        {
          ...addParent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (data) {
        setMessage('form  submitted')
        setAddParent(resetParentField)
      } else {
        setMessage('Student detail not submitted')
      }
    } catch (err) {
      setMessage('Network error')
    }
  }

  const validateField = () => {
    let errors = {}
    if (!addParent.fname.trim()) {
      errors.fname = 'First Name is required'
    }
    if (!addParent.lname.trim()) {
      errors.lname = 'Last Name is required'
    }

    if (!addParent.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(addParent.email)) {
      errors.email = 'Please Provide valid email'
    }

    if (!addParent.gender.trim()) {
      errors.gender = 'Please Select Gender'
    }
    // else if (addParent.gender !== ('Male' || 'Female' || 'Other')) {
    //   errors.gender = 'Please provide valid gender'
    // }

    if (!addParent.dob.trim()) {
      errors.dob = 'Please enter dob'
    }

    if (!addParent.contactNumber.trim()) {
      errors.contactNumber = 'Please provide contact number'
    } else if (addParent.contactNumber.length <= 7) {
      errors.contactNumber = 'Contact Number should be minimum 8'
    }

    if (!addParent.bloodGroup.trim()) {
      errors.bloodGroup = 'Blood Group needed'
    }

    if (!addParent.address.trim()) {
      errors.address = 'Plese enter Address'
    }

    if (!addParent.fatherName.trim()) {
      errors.fatherName = 'Plese enter Father Name'
    }

    if (!addParent.fatherCitizenShipNumber.trim()) {
      errors.fatherCitizenShipNumber = 'Plese enter Father Citizenship Number'
    }

    if (!addParent.religion.trim()) {
      errors.religion = 'Religion is required'
    }
    if (!addParent.caste.trim()) {
      errors.caste = 'Caste is required'
    }

    return errors
  }

  return (
    <div
      width={width}
      className={`bg-gray-200 h-auto ml-${
        width > 1024 && open ? 80 : 0
      } p-8 transition-all duration-500 ease-in-out  overflow-x-hidden`}
    >
      <h1 className="h-6 text-lg font-bold ">{title}</h1>
      <div className="pb-3">
        Home <span className="text-yellow-600"> &gt; {subTitle}</span>
      </div>

      <div className="card bg-gray-100 w-full">
        <div className="content p-5">
          <h2 className="header font-bold text-gray-800 mb-4">
            Add New Parent
          </h2>

          <form onSubmit={addParentHandler} type="post" noValidate>
            <div className="forminputContainer grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <FormInput
                label="First Name *"
                value={addParent.fname}
                name="fname"
                onChange={handlerChange}
                errors={errors.fname}
              />
              <FormInput
                label="Middle Name *"
                value={addParent.mname}
                name="mname"
                onChange={handlerChange}
                errors={errors.mname}
              />
              <FormInput
                label="Last Name *"
                value={addParent.lname}
                name="lname"
                onChange={handlerChange}
                errors={errors.lname}
              />
              <FormInput
                label="Last Name *"
                value={addParent.lname}
                name="lname"
                onChange={handlerChange}
                errors={errors.lname}
              />

              <SelectInput
                label="Gender *"
                value={addParent.gender}
                name="gender"
                onChange={handlerChange}
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
                value={addParent.dob}
                name="dob"
                type="date"
                onChange={handlerChange}
              />
              <FormInput
                label="Children Names *"
                value={addParent.childrenNames}
                name="childrenNames"
                onChange={handlerChange}
              />

              <FormInput
                label="Contanct Number *"
                value={addParent.contactNumber}
                name="contactNumber"
                onChange={handlerChange}
                errors={errors.contactNumber}
              />
              <SelectInput
                value={addParent.bloodGroup}
                label="Blood Group *"
                name="bloodGroup"
                onChange={handlerChange}
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
                value={addParent.email}
                label="Email *"
                name="email"
                type="email"
                onChange={handlerChange}
                errors={errors.email}
              />

              <FormInput
                value={addParent.address}
                label="Address *"
                name="address"
                onChange={handlerChange}
                errors={errors.address}
              />
              <FormInput
                value={addParent.fatherName}
                label="Father Name *"
                name="fatherName"
                onChange={handlerChange}
                errors={errors.fatherName}
              />
              <FormInput
                value={addParent.fatherCitizenShipNumber}
                label="Father Citizenship Number "
                name="fatherCitizenShipNumber"
                onChange={handlerChange}
                errors={errors.fatherCitizenShipNumber}
              />
              <FormInput
                value={addParent.motherName}
                label="Mother Name"
                name="motherName"
                onChange={handlerChange}
              />
              <FormInput
                value={addParent.motherCitizenShipNumber}
                label="Mother Citizenship Number"
                name="motherCitizenShipNumber"
                onChange={handlerChange}
              />
              <FormInput
                value={addParent.motherTongue}
                label="Mother Tongue *"
                name="motherTongue"
                onChange={handlerChange}
                errors={errors.motherTongue}
              />
              <FormInput
                value={addParent.caste}
                label="Caste *"
                name="caste"
                onChange={handlerChange}
                errors={errors.caste}
              />
              <FormInput
                value={addParent.ethnicity}
                label="Ethnicity"
                name="ethnicity"
                onChange={handlerChange}
              />

              <FormInput
                value={addParent.religion}
                label="Religion *"
                name="religion"
                onChange={handlerChange}
              />
              <FormInput
                value={addParent.occuption}
                label="Occupation *"
                name="occuption"
                onChange={handlerChange}
                errors={errors.occuption}
              />
              <button
                type="submit"
                className=" w-full block bg-yellow-300 p-2 md:w-40 border-none"
              >
                Submit
              </button>
              {message && <p className="text-green-500">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddParent
