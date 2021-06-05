import axios from 'axios'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Loader from '../components/UI/Loader'
import Model from '../components/UI/Model'
import Routine from './Routine'

function UpdatetRoutine({ open }) {
  const { id } = useParams()
  const history = useHistory()
  const [idData, setIdData] = useState({})
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)

  React.useEffect(() => {
    async function fetchUpdateRoutine() {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `/api/routine/viewRoutineDetailById/${id}`
        )
        if (data) {
          setIdData(data)
          setUpdateStatus(true)
          setLoading(false)
        }
      } catch (err) {
        setErrors(err.response.message)
        setLoading(false)
      }
    }
    fetchUpdateRoutine()
  }, [])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : errors ? (
        <Model
          message={errors}
          handleClose={() => {
            history.goBack()
            setErrors('')
          }}
        />
      ) : (
        <Routine open={open} updateStatus={updateStatus} idData={idData} />
      )}
    </div>
  )
}

export default UpdatetRoutine
