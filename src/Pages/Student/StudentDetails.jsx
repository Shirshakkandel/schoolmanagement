import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components/macro'

const StudentDetails = ({ width, open, title, subTitle }) => {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [studentDetail, setStudentDetail] = useState({})
  
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
        <div className="card bg-white flex flex-col md:flex p-5 ">
          <div className="image">
            <img
              src={`${
                studentDetail.gender === 'Female'
                  ? ' https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/student1.jpg'
                  : ''
              }`}
            />
          </div>
          <div className="right flex  flex-col">
            <div className="heading flex justify-content">
              <h2>{studentDetail ? studentDetail.name : 'Shirshak kandel'}</h2>
              <div className="icon">
                <span>Update</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </StudentDetailStyled>
  )
}

export default StudentDetails

const StudentDetailStyled = styled.div``
