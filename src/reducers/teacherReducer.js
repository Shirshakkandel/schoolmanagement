initialState = {
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
} 
export const teacherAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Teacher_ADD_REQUEST":
            return {loading:true}
    }
    
}