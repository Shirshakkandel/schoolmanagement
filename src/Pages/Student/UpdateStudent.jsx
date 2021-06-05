import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  FormInput,
  SelectInput,
} from '../../components/UI/Form/FormInput'
import { useWindowSize } from '../../globalState/globalState'
import StudentDetails from './StudentDetails'

const UpdateStudent = ({ title, subTitle, open }) => {
  const { id } = useParams()
  const width = useWindowSize()
  const [studentDetail, setStudentDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  console.log(errors)

  useEffect(() => {
    async function fetchSinglStudentDetail() {
      const { data } = await axios.get(`/api/student/getStudentDataById/${id}`)
      if (data) {
        setStudentDetail(data)
        setLoading(false)
      }
    }
    fetchSinglStudentDetail()
  }, [])
  
  const handlerChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setStudentDetail({ ...studentDetail, [name]: value })
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      update()
    }
  }, [errors])

  function updateStudent(e) {
    e.preventDefault()
    setIsSubmitting(false)
    setMessage('')
    setErrors(validateField())
    setIsSubmitting(true)
  }
  
  const validateField = () => {
    let errors = {}
    if (!studentDetail.fname.trim()) {
      errors.fname = 'First Name is required'
    }
    if (!studentDetail.lname.trim()) {
      errors.lname = 'Last Name is required'
    }

    if (!studentDetail.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(studentDetail.email)) {
      errors.email = 'Please Provide valid email'
    }

    if (!studentDetail.gender.trim()) {
      errors.gender = 'Please Select Gender'
    }
    // else if (studentDetail.gender !== ('Male' || 'Female' || 'Other')) {
    //   errors.gender = 'Please provide valid gender'
    // }

    if (!studentDetail.dob.trim()) {
      errors.dob = 'Please enter dob'
    }
    if (!studentDetail.rollNumber.trim()) {
      errors.rollNumber = 'Plese enter roll number'
    }
    if (!studentDetail.contactNumber.trim()) {
      errors.contactNumber = 'Please provide contact number'
    } else if (studentDetail.contactNumber.length <= 7) {
      errors.contactNumber = 'Contact Number should be minimum 8'
    }

    if (!studentDetail.bloodGroup.trim()) {
      errors.bloodGroup = 'Blood Group needed'
    }

    if (!studentDetail.address.trim()) {
      errors.address = 'Plese enter Address'
    }

    if (!studentDetail.sectionName.trim()) {
      errors.sectionName = 'Plese enter Section Name'
    }

    if (!studentDetail.fatherName.trim()) {
      errors.fatherName = 'Plese enter Father Name'
    }

    if (!studentDetail.fatherCitizenShipNumber.trim()) {
      errors.fatherCitizenShipNumber = 'Plese enter Father Citizenship Number'
    }

    if (!studentDetail.religion.trim()) {
      errors.religion = 'Religion is required'
    }
    if (!studentDetail.caste.trim()) {
      errors.caste = 'Caste is required'
    }

    return errors
  }

  async function update() {
    try {
      const data = await axios.put(
        `/api/student/updateStudentDetail/${id}`,
        {
          ...studentDetail,
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
        setMessage('Student detail not submitted')
      }
    } catch (err) {
      setMessage('Network error')
    }
  }

  return (
    <div
      width={width}
      className={`bg-gray-200 h-auto ml-${
        width > 1024 && open ? 80 : 0
      } p-8 transition-all duration-500 ease-in-out`}
      overflow-x-hidden
    >
      <h1 className="h-6 text-lg font-bold ">{title}</h1>
      <div className="pb-3">
        Home <span className="text-yellow-600"> &gt; {subTitle}</span>
      </div>
      <div className="card bg-gray-100 w-full">
        <div className="content p-5">
          <h2 className="header font-bold text-gray-800 mb-4">
            Update Detail of Student
          </h2>

          <form onSubmit={updateStudent} type="post" noValidate>
            {loading ? (
              'Loading'
            ) : (
              <div className="forminputContainer grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <FormInput
                  label="First Name *"
                  value={studentDetail.fname}
                  name="fname"
                  onChange={handlerChange}
                  errors={errors.fname}
                />
                <FormInput
                  label="Middle Name"
                  value={studentDetail.mname}
                  name="mname"
                  onChange={handlerChange}
                  errors={errors.mname}
                />

                <FormInput
                  label="Last Name *"
                  value={studentDetail.lname}
                  name="lname"
                  onChange={handlerChange}
                  errors={errors.lname}
                />

                <SelectInput
                  label="Gender *"
                  value={studentDetail.gender}
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
                  value={studentDetail.dob}
                  name="dob"
                  type="date"
                  onChange={handlerChange}
                />
                <SelectInput
                  value={studentDetail.grade}
                  label="Grade *"
                  name="grade"
                  onChange={handlerChange}
                  options={[
                    {
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
                  value={studentDetail.sectionName}
                  label="Section Name "
                  name="sectionName"
                  onChange={handlerChange}
                  errors={errors.sectionName}
                />

                <FormInput
                  label="Roll Number *"
                  value={studentDetail.rollNumber}
                  name="rollNumber"
                  onChange={handlerChange}
                  errors={errors.rollNumber}
                />

                <FormInput
                  label="Contanct Number *"
                  value={studentDetail.contactNumber}
                  name="contactNumber"
                  onChange={handlerChange}
                  errors={errors.contactNumber}
                />
                <SelectInput
                  value={studentDetail.bloodGroup}
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
                  errors={errors.bloodGroup}
                />

                <FormInput
                  value={studentDetail.email}
                  label="Email *"
                  name="email"
                  type="email"
                  onChange={handlerChange}
                  errors={errors.email}
                />

                <FormInput
                  value={studentDetail.address}
                  label="Address *"
                  name="address"
                  onChange={handlerChange}
                  errors={errors.address}
                />

                <FormInput
                  value={studentDetail.fatherName}
                  label="Father Name *"
                  name="fatherName"
                  onChange={handlerChange}
                />

                <FormInput
                  value={studentDetail.fatherCitizenShipNumber}
                  label="Father Citizenship Number *"
                  name="fatherCitizenShipNumber"
                  onChange={handlerChange}
                  errors={errors.fatherCitizenShipNumber}
                />

                <FormInput
                  value={studentDetail.fatherOccupation}
                  label="Father Occupation *"
                  name="fatherOccupation"
                  onChange={handlerChange}
                />

                <FormInput
                  value={studentDetail.motherName}
                  label="Mother Name"
                  name="motherName"
                  onChange={handlerChange}
                />

                <FormInput
                  value={studentDetail.motherOccupation}
                  label="Mother Occupation"
                  name="motherOccupation"
                  onChange={handlerChange}
                />

                <FormInput
                  value={studentDetail.motherCitizenShipNumber}
                  label="Mother Citizenship Number"
                  name="motherCitizenShipNumber"
                  onChange={handlerChange}
                />

                <FormInput
                  value={studentDetail.motherTongue}
                  label="Mother Tongue *"
                  name="motherTongue"
                  onChange={handlerChange}
                  errors={errors.motherTongue}
                />

                <FormInput
                  value={studentDetail.caste}
                  label="Caste *"
                  name="caste"
                  onChange={handlerChange}
                  errors={errors.caste}
                />

                <FormInput
                  value={studentDetail.ethnicity}
                  label="Ethnicity"
                  name="ethnicity"
                  onChange={handlerChange}
                />

                <FormInput
                  value={studentDetail.religion}
                  label="Religion"
                  name="religion"
                  onChange={handlerChange}
                />

                <SelectInput
                  value={studentDetail.disable}
                  label="Disable *"
                  name="disable"
                  onChange={handlerChange}
                  options={[
                    { label: 'Disable', value: '' },
                    {
                      label: 'true',
                      ngValue: 'true',
                    },
                    {
                      label: 'false',
                      ngValue: 'false',
                    },
                  ]}
                  errors={errors.disable}
                />

                <FormInput
                  value={studentDetail.disabilityName}
                  label="Disibility Name"
                  name="disabilityName"
                  onChange={handlerChange}
                  errors={errors.disabilityName}
                />

                <FormInput
                  value={studentDetail.dateOfAdmission}
                  label="Date of Admission *"
                  name="dateOfAdmission"
                  type="date"
                  onChange={handlerChange}
                  errors={errors.dateOfAdmission}
                />

                <SelectInput
                  value={studentDetail.feeStatus}
                  label="Fee Status *"
                  name="feeStatus"
                  onChange={handlerChange}
                  options={[
                    { id: 1, label: 'Fee Status *', value: '' },
                    { id: 2, label: 'Full Paid', value: 'fullPaid' },
                    { id: 3, label: 'Partial Paid', value: 'partialPaid' },
                    { id: 4, label: 'Not Paid', value: 'notPaid' },
                  ]}
                  errors={errors.feeStatus}
                />

                <FormInput
                  value={studentDetail.dateOfLeave}
                  label="Date of leave"
                  name="dateOfLeave"
                  onChange={handlerChange}
                  errors={errors.dateOfLeave}
                />
                <FormInput
                  value={studentDetail.discountAmount}
                  label="Discount Amount"
                  name="discountAmount"
                  type="number"
                  onChange={handlerChange}
                    errors={errors.discountAmount}
                />
                <button
                  type="submit"
                  className=" w-full block bg-yellow-300 p-2 md:w-40 border-none"
                >
                  Update
                </button>
                {message && <p className="text-green-500">{message}</p>}
              </div>
            )}
          </form>
        </div>
      </div>
      {/*ENd of Card */}
    </div>
  )
}

export default UpdateStudent
