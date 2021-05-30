import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Loader from '../../components/UI/Loader'
import Model from '../../components/UI/Model'
import AddNewTeacher from './AddNewTeacher'

function UpdateTeacher({ open }) {
  const { id } = useParams()
  const history = useHistory()
  const [updateStatus, setUpdateStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [teacherDetail, setteacherdetail] = useState({})

  React.useEffect(() => {
    async function fetchTeacherDetail() {
      setLoading(true)
      try {
        const updateUrl = '/api/teacher/viewTeacherDetailById/' + id

        const { data } = await axios.get(updateUrl)
        if (data) {
          setteacherdetail(data)
          setLoading(false)
          setUpdateStatus(true)
        }
      } catch (err) {
        // setError(err.response.message)
        setLoading(false)
      }
    }
    fetchTeacherDetail()
  }, [])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Model
          message={error}
          handleClose={() => {
            history.goBack()
            setError('')
          }}
        />
      ) : (
        <AddNewTeacher
          open={open}
          updateStatus={updateStatus}
          idData={teacherDetail}
        />
      )}
    </div>
  )
}

export default UpdateTeacher
