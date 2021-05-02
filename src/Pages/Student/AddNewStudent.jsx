import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddNewStudent = ({ title, subTitle, open, width }) => {
  const [newStudent, setNewStudent] = useState({
    address: '',
    bloodGroup: '',
    caste: '',
    contactNumber: '',
    dataOfAdmission: '',
    dataOfLeave: '',
    disable: Boolean(false),
    disibilityName: '',
    discountAmount: '',
    discountRate: '',
    dob: '',
    email: '',
    ethnicity: '',
    fatherCitizenShipNumber: '',
    fatherName: '',
    fatherOccupation: '',
    feeStatus: '',
    fname: '',
    gender: '',
    grade: '',
    hasDiscount: '',
    lname: '',
    mname: '',
    motherCitizenShipNumber: '',
    motherName: '',
    motherOccupation: '',
    motherTongue: '',
    religion: '',
    remainingFee: '',
    rollNumber: '',
    sectionName: '',
    totalAmountFee: '',
    totalPaidFee: '',
  })
  const resetStudentField = {
    address: '',
    bloodGroup: '',
    caste: '',
    contactNumber: '',
    dataOfAdmission: '',
    dataOfLeave: '',
    disibilityName: '',
    discountAmount: '',
    discountRate: '',
    dob: '',
    email: '',
    ethnicity: '',
    fatherCitizenShipNumber: '',
    fatherName: '',
    fatherOccupation: '',
    feeStatus: '',
    fname: '',
    gender: '',
    grade: '',
    hasDiscount: '',
    lname: '',
    mname: '',
    motherCitizenShipNumber: '',
    motherName: '',
    motherOccupation: '',
    motherTongue: '',
    religion: '',
    remainingFee: '',
    rollNumber: '',
    sectionName: '',
    totalAmountFee: '',
    totalPaidFee: '',
  }
  const [disabled, setDisabled] = useState(null)
  useEffect(() => {
    if (newStudent.disable === 'true') {
      newStudent.disable = true
      setDisabled('')
    } else {
      newStudent.disable = false
      setDisabled('disabled')
    }
  }, [newStudent.disable])

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callpost()
    }
  }, [errors])

  const handlerChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setNewStudent({ ...newStudent, [name]: value })
  }

  const newStudentInput = [
    {
      id: 1,
      label: 'First Name *',
      type: 'text',
      value: newStudent.fname,
      name: 'fname',
    },
    {
      id: 2,
      label: 'Middle Name *',
      type: 'text',
      value: newStudent.mname,
      name: 'mname',
    },
    {
      id: 3,
      label: 'Last Name *',
      type: 'text',
      value: newStudent.lname,
      name: 'lname',
    },

    {
      id: 4,
      label: 'Gender *',
      value: newStudent.gender,
      name: 'gender',
      options: [
        { id: 1, label: 'Gender *', value: '' },
        { id: 2, label: 'Male', value: 'Male' },
        { id: 3, label: 'Female', value: 'Female' },
        { id: 4, label: 'Other', value: 'Other' },
      ],
    },

    {
      id: 5,
      label: 'Date of Birth *',
      value: newStudent.dob,
      name: 'dob',
      type: 'date',
    },
    {
      id: 6,
      label: 'Roll',
      value: newStudent.rollNumber,
      name: 'rollNumber',
      type: 'text',
    },
    {
      id: 31,
      label: 'Contanct Number *',
      value: newStudent.contactNumber,
      name: 'contactNumber',
      type: 'String',
    },
    {
      id: 7,
      value: newStudent.bloodGroup,
      label: 'Blood Group *',
      name: 'bloodGroup',
      options: [
        { id: 1, label: 'Blood Group *', value: '' },
        { id: 2, label: 'A+', value: 'A+' },
        { id: 3, label: 'A-', value: 'A-' },
        { id: 4, label: 'B+', value: 'B+' },
        { id: 5, label: 'B-', value: 'B-' },
        { id: 6, label: 'O+', value: 'O+' },
        { id: 7, label: 'O-', value: 'O-' },
      ],
    },

    {
      id: 8,
      value: newStudent.email,
      label: 'Email *',
      name: 'email',
      type: 'email',
    },

    {
      id: 30,
      value: newStudent.address,
      label: 'Address *',
      name: 'address',
      type: 'text',
    },
    {
      id: 9,
      value: newStudent.grade,
      label: 'Grade *',
      name: 'grade',
      options: [
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
      ],
    },

    {
      id: 29,
      value: newStudent.sectionName,
      label: 'Section Name ',
      name: 'sectionName',
      type: 'text',
    },

    {
      id: 10,
      value: newStudent.fatherName,
      label: 'Father Name *',
      name: 'fatherName',
      type: 'text',
    },

    {
      id: 11,
      value: newStudent.fatherCitizenShipNumber,
      label: 'Father Citizenship Number *',
      name: 'fatherCitizenShipNumber',
      type: 'text',
    },
    {
      id: 12,
      label: 'Father occupation ',
      value: newStudent.fatherOccupation,
      name: 'fatherOccupation',
      type: 'text',
    },

    {
      id: 33,
      label: 'Mother Name',
      value: newStudent.motherName,
      name: 'motherName',
      type: 'text',
    },
    {
      id: 13,
      label: 'Mother Occupation ',
      value: newStudent.motherOccupation,
      name: 'motherOccupation',
      type: 'text',
    },
    {
      id: 14,
      label: 'Mother Citizenship Number ',
      value: newStudent.motherCitizenShipNumber,
      name: 'motherCitizenShipNumber',
      type: 'text',
    },
    {
      id: 15,
      label: 'Mother Tongue ',
      value: newStudent.motherTongue,
      name: 'motherTongue',
      type: 'text',
    },
    {
      id: 16,
      label: 'Caste ',
      value: newStudent.caste,
      name: 'caste',
      type: 'text',
    },
    {
      id: 17,
      label: 'Ethnicity ',
      value: newStudent.ethnicity,
      name: 'ethnicity',
      type: 'text',
    },
    {
      id: 18,
      label: 'Religion *',
      value: newStudent.religion,
      name: 'religion',
      type: 'text',
    },
    {
      id: 36,
      label: 'Disable *',
      value: newStudent.disable,
      name: 'disable',
      options: [
        { id: 1, label: 'Disable', value: '' },
        {
          id: 2,
          label: 'true',
          ngValue: 'true',
        },
        {
          id: 3,
          label: 'false',
          ngValue: 'false',
        },
      ],
    },

    {
      id: 19,
      label: 'Disibility Name',
      value: newStudent.disibilityName,
      name: 'disibilityName',
      type: 'text',
      disabled,
    },
    {
      id: 20,
      label: 'Date of Admission *',
      value: newStudent.dataOfAdmission,
      name: 'dataOfAdmission',
      type: 'date',
    },
    {
      id: 35,
      label: 'Fee Status *',
      value: newStudent.feeStatus,
      name: 'feeStatus',
      type: 'date',
      options: [
        { id: 1, label: 'Fee Status *', value: '' },
        { id: 2, label: 'Full Paid', value: 'fullPaid' },
        { id: 3, label: 'Partial Paid', value: 'partialPaid' },
        { id: 4, label: 'Not Paid', value: 'notPaid' },
      ],
    },
    {
      id: 21,
      label: 'Date of leave',
      value: newStudent.dataOfLeave,
      name: 'dataOfLeave',
      type: 'date',
    },
    {
      id: 22,
      label: 'Discount Rate',
      value: newStudent.discountRate,
      name: 'discountRate',
      type: 'number',
    },
    {
      id: 23,
      label: 'Discount Amount',
      value: newStudent.discountAmount,
      name: 'discountAmount',
      type: 'number',
    },
    {
      id: 24,
      label: 'Total Amount Fee',
      value: newStudent.totalAmountFee,
      name: 'totalAmountFee',
      type: 'number',
    },
    {
      id: 25,
      label: 'Total paid Fee',
      value: newStudent.totalPaidFee,
      name: 'totalPaidFee',
      type: 'number',
    },
    {
      id: 26,
      label: 'Remaining Fee',
      value: newStudent.totalAmountFee - newStudent.totalPaidFee,
      name: 'remainingFee',
      type: 'number',
    },
    {
      id: 27,
      label: 'Has Discount',
      value: newStudent.hasDiscount,
      name: 'hasDiscount',
      type: 'text',
    },
  ]
  const validateField = () => {
    let errors = {}
    if (!newStudent.fname.trim()) {
      errors.fname = 'First Name is required'
    }
    if (!newStudent.lname.trim()) {
      errors.lname = 'Last Name is required'
    }

    if (!newStudent.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(newStudent.email)) {
      errors.email = 'Please Provide valid email'
    }

    if (!newStudent.gender.trim()) {
      errors.gender = 'Please Select Gender'
    }
    // else if (newStudent.gender !== ('Male' || 'Female' || 'Other')) {
    //   errors.gender = 'Please provide valid gender'
    // }

    if (!newStudent.dob.trim()) {
      errors.dob = 'Please enter dob'
    }
    if (!newStudent.rollNumber.trim()) {
      errors.rollNumber = 'Plese enter roll number'
    }
    if (!newStudent.contactNumber.trim()) {
      errors.contactNumber = 'Please provide contact number'
    } else if (newStudent.contactNumber.length <= 7) {
      errors.contactNumber = 'Contact Number should be minimum 8'
    }

    if (!newStudent.bloodGroup.trim()) {
      errors.bloodGroup = 'Blood Group needed'
    }
    // else if (
    //   newStudent.bloodGroup !== ('A+' || 'A-' || 'B+' || 'B-' || 'O+' || 'O-')
    // ) {
    //   errors.bloodGroup = 'Provide valid Blood Group'
    // }

    if (!newStudent.address.trim()) {
      errors.address = 'Plese enter Address'
    }

    if (!newStudent.sectionName.trim()) {
      errors.sectionName = 'Plese enter Section Name'
    }

    if (!newStudent.fatherName.trim()) {
      errors.fatherName = 'Plese enter Father Name'
    }

    if (!newStudent.fatherCitizenShipNumber.trim()) {
      errors.fatherCitizenShipNumber = 'Plese enter Father Citizenship Number'
    }

    if (!newStudent.religion.trim()) {
      errors.religion = 'Religion is required'
    }
    if (!newStudent.caste.trim()) {
      errors.caste = 'Caste is required'
    }

    // if (!newStudent.disable.trim()) {
    //   errors.disable = 'Disable field should be field'
    // } else if (!newStudent.disable !== (true || false)) {
    //   errors.disable = 'Disable should be true or false'
    // }

    // else if () { }
    return errors
  }

  async function callpost() {
    try {
      const data = await axios.post(
        '/api/student/addNewStudent',
        {
          ...newStudent,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (data) {
        setMessage('form  submitted')
        setNewStudent(resetStudentField)
      }
    } catch (err) {
      setMessage('Network error')
    }
  }

  async function addnewStudent(e) {
    setErrors({})
    setMessage('')
    e.preventDefault()
    setErrors(validateField())
    setIsSubmitting(true)
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
            Add New Students
          </h2>
          <form onSubmit={addnewStudent} type="post" noValidate>
            <div className="forminputContainer  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {newStudentInput.map(
                ({ id, label, type, value, name, options, disable }) => (
                  <SingleFormGroup
                    key={id}
                    id={id}
                    label={label}
                    name={name}
                    options={options}
                    type={type}
                    value={value}
                    onChange={handlerChange}
                    errors={errors}
                    disable={disable}
                  />
                )
              )}
            </div>

            <button
              type="submit"
              className=" w-full block bg-yellow-300 p-2 md:w-40"
            >
              Submit
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export const SingleFormGroup = ({
  id,
  name,
  label,
  options,
  value,
  type,
  onChange,
  errors,
  disabled,
}) => {
  return !options ? (
    <div key={id} className="group flex flex-col">
      <label className="mb-2 pl-1">{label}</label>
      <input
        className="h-10 mb-2 outline-none bg-gray-300 p-2"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors[name] && <p className=" text-red-500">{errors[name]}</p>}
    </div>
  ) : (
    <div key={id} className="flex flex-col">
      <label className="mb-2 pl-1">{label}</label>
      <select
        className="h-10 mb-2 outline-none bg-gray-300 p-2"
        onChange={onChange}
        name={name}
      >
        {options.map(({ id, label, value }) => (
          <option key={id} className="outline-none" value={value}>
            {label}
          </option>
        ))}
      </select>
      {errors[name] && <p className=" text-red-500">{errors[name]}</p>}
    </div>
  )
}
