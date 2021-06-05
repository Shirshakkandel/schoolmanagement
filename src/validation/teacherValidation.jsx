export default function teacherValidation(values) {
  let errors = {}
  if (!values.fname.trim()) {
    errors.fname = 'Enter your First Name'
  }

  if (!values.lname.trim()) {
    errors.lname = 'Last Name is required'
  }

  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Please provide valid email'
  }

  if (!values.gender.trim()) {
    errors.gender = 'Please Select Gender'
  }

  if (!values.dob) {
    errors.dob = 'Please enter dob'
  }

  if (!values.contactNumber.trim()) {
    errors.contactNumber = 'Please provide contact number'
  } else if (values.contactNumber.length <= 7) {
    errors.contactNumber = 'Contact Number should be minimum 8'
  }

  if (!values.bloodGroup.trim()) {
    errors.bloodGroup = 'Blood Group needed'
  }

  if (!values.address.trim()) {
    errors.address = 'Plese enter Address'
  }

  if (!values.fatherName.trim()) {
    errors.fatherName = 'Plese enter Father Name'
  }

  if (!values.fatherCitizenShipNumber.trim()) {
    errors.fatherCitizenShipNumber = 'Plese enter Father Citizenship Number'
  }

  if (!values.religion.trim()) {
    errors.religion = 'Religion is required'
  }

  if (!values.caste.trim()) {
    errors.caste = 'Caste is required'
  }

  //Extra validation
  if (!values.emergencyContactNumber.trim()) {
    errors.emergencyContactNumber = 'Emergency Contanct Number required'
  } else if (values.emergencyContactNumber.length <= 7) {
    errors.emergencyContactNumber = 'Contact Number should be minimum 8'
  }

  if (!values.isClassTeacher.trim()) {
    errors.isClassTeacher = 'Select Yes or No'
  }

  if (!values.grade.trim()) {
    errors.grade = 'Select Grade'
  }

  if (!values.disable) {
    errors.disable = 'Select Yes or No'
  }

  if (!values.motherTongue.trim()) {
    errors.motherTongue = 'Select Mother Tongue'
  }

  return errors
}
