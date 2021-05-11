import React, { useState } from 'react'
import useForm from '../../components/customeHook/useForm'
import FormContainer from '../../components/UI/Form/FormContainer'
import { FormInput, SelectInput } from '../../components/UI/Form/FormInput'
import PageHeader from '../../components/UI/PageHeader'
import { useWindowSize } from '../../globalState/globalState'

export default function AddNewTeacher({ open }) {
  const width = useWindowSize()
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
        subjectCode: '',
        subjectName: '',
      }, 
    ],
    totalEarning: '',
  })
  const { handleChange, values, handleSubmit, errors } = useForm(
    addTeacher,
    teacherField,
    setAddTeacherField
  )

  function addTeacher() {}
  return (
    <PageHeader
      title="Teacher"
      subTitle="Add New Teacehr"
      open={open}
      width={width}
    >
      <form noValidate>
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
            label="Disability Name *"
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
            name="totalEarning"
            onChange={handleChange}
            errors={errors.totalEarning}
          />

          <div>
            <label htmlFor="">Subject</label>
          </div>
        </FormContainer>

        <button
          type="submit"
          className=" w-full block bg-yellow-300 p-2 md:w-52 focus:outline-none"
        >
          Submit
        </button>
        {/* {message && <p className="text-green-500">{message}</p>} */}
      </form>
    </PageHeader>
  )
}
