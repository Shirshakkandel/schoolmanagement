import axios from 'axios'
import { useEffect, useState } from 'react'

export function useSingleStudentDetail(id) {
  const [loading, setLoading] = useState(false)
  const [studentDetail, setStudentDetail] = useState({})
  useEffect(() => {
    async function fetchstudent(id) {
      const { data } = await axios.get(`/api/student/getStudentDataById/${id}`)
      if (data) {
        setStudentDetail(data)
        setLoading(false)
      }
    }
    fetchstudent(id)
  }, [id])
  return { loading, studentDetail }
}
