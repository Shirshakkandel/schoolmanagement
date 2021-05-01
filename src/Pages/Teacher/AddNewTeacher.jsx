import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components/macro'

function AddNewTeacher({ width, open, title, subTitle }) {
  const [newTeacher, setNewTeacher] = useState({
    address: '',
    bloodGroup: '',
    caste: '',
    contactNumber: '',
    disabilityName: '',
    dob: '',
    id: '',
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
        id: {},
        subjectCode: '',
        subjectName: '',
      },
    ],
    totalEarning: '',
  })

  const newTeacherInput = [
    {
      id: 1,
      label: 'First Name *',
      type: 'text',
      value: newTeacher.fname,
      name: 'fname',
    },
    {
      id: 2,
      label: 'Middle Name *',
      type: 'text',
      value: newTeacher.mname,
      name: 'mname',
    },
    {
      id: 3,
      label: 'Last Name *',
      type: 'text',
      value: newTeacher.lname,
      name: 'lname',
    },

    {
      id: 4,
      label: 'Gender *',
      value: newTeacher.gender,
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
      value: newTeacher.dob,
      name: 'dob',
      type: 'date',
    },

    {
      id: 6,
      value: newTeacher.bloodGroup,
      label: 'Blood Group *',
      name: 'bloodGroup',
      type: 'text',
    },
    {
      id: 8,
      value: newTeacher.email,
      label: 'Email *',
      name: 'email',
      type: 'email',
    },
    {
      id: 12,
      value: newTeacher.address,
      label: 'Address *',
      name: 'address',
      type: 'text',
    },

    {
      id: 9,
      value: newTeacher.grade,
      label: 'Grade *',
      name: 'grade',
      options: [
        {
          id: 1,
          label: 'Please Select Class *',
          value: 'Please Select Class *',
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
      id: 10,
      value: newTeacher.fatherName,
      label: 'Father Name *',
      name: 'fatherName',
      type: 'text',
    },

    {
      id: 11,
      value: newTeacher.fatherCitizenShipNumber,
      label: 'Father Citizenship Number *',
      name: 'fatherCitizenShipNumber',
      type: 'text',
    },

    {
      id: 14,
      label: 'Mother Citizenship Number ',
      value: newTeacher.motherCitizenShipNumber,
      name: 'motherCitizenShipNumber',
      type: 'text',
    },
    {
      id: 15,
      label: 'Mother Tongue ',
      value: newTeacher.motherTongue,
      name: 'motherTongue',
      type: 'text',
    },
    {
      id: 16,
      label: 'Caste ',
      value: newTeacher.caste,
      name: 'Caste',
      type: 'text',
    },
    {
      id: 17,
      label: 'Ethnicity ',
      value: newTeacher.ethnicity,
      name: 'ethnicity',
      type: 'text',
    },
    {
      id: 18,
      label: 'Religion *',
      value: newTeacher.religion,
      name: 'religion',
      type: 'text',
    },

    {
      id: 21,
      label: 'Date of leave',
      value: newTeacher.dataOfLeave,
      name: 'dataOfLeave',
      type: 'date',
    },

    {
      id: 27,
      label: 'Has Discount',
      value: newTeacher.hasDiscount,
      name: 'hasDiscount',
      type: 'text',
    },
  ]

  const handlerChange = async (e) => {
    const name = e.target.name
    const value = e.target.value
    setNewTeacher({ ...newTeacher, [name]: value })
  }

  async function addNewTeacher() {
    const { data } = await axios.post(
      '/api/teacher/addNewTeacherDetail',
      {
        ...newTeacher,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }

  return (
    <AddNewTeacherStyled
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
            Add New Students
          </h2>
          <form onSubmit={addNewTeacher} type="post">
            <div className="forminputContainer  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {newTeacherInput.map(
                ({ id, label, type, value, name, options }) => (
                  <SingleFormGroup
                    id={id}
                    label={label}
                    name={name}
                    options={options}
                    type={type}
                    value={value}
                    onChange={handlerChange}
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
          </form>
        </div>
      </div>
    </AddNewTeacherStyled>
  )
}
export default AddNewTeacher

const AddNewTeacherStyled = styled.div``

export const SingleFormGroup = ({
  id,
  name,
  label,
  options,
  value,
  type,
  onChange,
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
    </div>
  ) : (
    <div key={id} className="flex flex-col">
      <label className="mb-2 pl-1">{label}</label>
      <select
        className="h-10 mb-2 outline-none bg-gray-300 p-2"
        onChange={onChange}
        name={name}
      >
        {options.map(({ id, label }) => (
          <option key={id} className="outline-none" value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
