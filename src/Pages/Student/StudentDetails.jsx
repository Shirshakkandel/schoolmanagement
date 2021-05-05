import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components/macro'
import { useWindowSize } from '../../globalState/globalState'

const StudentDetails = ({ open, title, subTitle }) => {
  const [loading, setLoading] = useState(true)
  const width = useWindowSize()
  const { id } = useParams()
  const [ studentDetail, setStudentDetail ]= useState({})
  const history = useHistory()

  useEffect(() => {
    async function fetchStudentDetail() {
      const { data } = await axios.get(`/api/student/getStudentDataById/${id}`)
      if (data) {
        setStudentDetail(data)
        setLoading(false)
      }
    }
    fetchStudentDetail()
  }, [])
  const {
    fname,
    lname,
    mname,
    gender,
    address,
    bloodGroup,
    caste,
    contactNumber,
    email,
    fatherCitizenShipNumber,
    fatherName,
    feeStatus,
    rollNumber,
    motherName,
    fatherOccupation,
  } = studentDetail
  const name = `${fname} ${mname} ${lname}`
  return (
    <StudentDetailStyled
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
      {loading ? (
        'loading'
      ) : (
        <div className="card bg-white flex flex-col space-x-4 p-1 md:flex-row md:p-5 md:space-x-10 ">
          <div className="image mx-auto mb-3">
            <img
              src={`${
                gender === 'Female'
                  ? '/images/femaleStudent.jpg'
                  : '/images/maleStudent.png'
              }`}
            />
          </div>
          <div className="right flex flex-col flex-1">
            <div className="heading flex justify-between ">
              <h2 className="font-extrabold text-gray-600 mb-5 w-2/4">
                {name}
              </h2>
              <div className="icon">
                <button
                  onClick={() => history.push(`/updateStudentForm/${id}`)}
                  className="hover:cursor focus:outline-none mr-6  bg-red-600 p-1 text-white text-center"
                >
                  Update
                </button>
              </div>
            </div>
            <DetailField label={'Name:'} detail={name} />
            <DetailField label={'Gender:'} detail={gender} />
            <DetailField label={'Father Name:'} detail={fatherName} />
            <DetailField label={'Mother Name:'} detail={motherName} />
            <DetailField
              label={'Father Occupation:'}
              detail={fatherOccupation}
            />
            <DetailField label={'Contact Number:'} detail={contactNumber} />
            <DetailField label={'Email Address:'} detail={email} />
            <DetailField label={'Fee Status:'} detail={feeStatus} />
          </div>
        </div>
      )}
    </StudentDetailStyled>
  )
}

export default StudentDetails

function DetailField({ label, detail }) {
  return (
    <div className="name flex space-x-2 pb-2">
      <h2 className=" text-gray-500 w-1/3 md:w-1/3">{label}</h2>
      <h2 className="font-medium w-1/2 md:w-2/3">{detail}</h2>
    </div>
  )
}

const StudentDetailStyled = styled.div``
