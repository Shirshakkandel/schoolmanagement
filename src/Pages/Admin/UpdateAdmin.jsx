import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Loader from '../../components/UI/Loader'
import Model from '../../components/UI/Model'
import AddAdmin from './AddAdmin'

function UpdateAdmin({ open }) {
  const { id } = useParams()
  const history = useHistory()
  const [updateStatus, setUpdateStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [adminDetail, setAdmindetail] = useState({})

  React.useEffect(() => {
    async function fetchAdminDetail() {
      setLoading(true)
      try {
        const updateUrl = '/api/admin/viewAdminDetailById/' + id

        const { data } = await axios.get(updateUrl)
        if (data) {
          setAdmindetail(data)
          setLoading(false)
          setUpdateStatus(true)
        }
      } catch (err) {
        // setError(err.response.message)
        setLoading(false)
      }
    }
    fetchAdminDetail()
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
        <AddAdmin
          open={open}
          updateStatus={updateStatus}
          idData={adminDetail}
        />
      )}
    </div>
  )
}

export default UpdateAdmin
