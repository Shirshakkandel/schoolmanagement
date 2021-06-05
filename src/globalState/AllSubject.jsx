import axios from 'axios'
import React, { useEffect, useState } from 'react'

export function useAllSubject() {
  const [loading, setLoading] = useState(false)
  const [allSubject, setAllSubject] = useState({})
  useEffect(() => {
    async function fetchSubject() {
      setLoading(true)
      try {
        const { data } = await axios.get('/api/Subject/viewAllSubjectDetail')
        if (data) {
          setAllSubject(data)
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
      }
    }
    fetchSubject()
  }, [])
  return { loading, allSubject }
}
