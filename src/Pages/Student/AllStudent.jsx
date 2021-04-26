import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

function AllStudent() {
  const [students, setStudent] = useState([])

  useEffect(() => {
    async function fetchAllStudent() {
      const allStudent = await axios.get('/api/student/getAllStudentDetail')
      setStudent(allStudent)
    }
    fetchAllStudent()
  }, [])

  return <AllStudentStyle>{console.log(students)}</AllStudentStyle>
}
export default AllStudent

const AllStudentStyle = styled.div``
