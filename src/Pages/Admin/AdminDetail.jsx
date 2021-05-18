import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Detail from '../../components/HigherCompoent/Detail'
import { DetailField } from '../../components/UI/DetailField'
import Loader from '../../components/UI/Loader'
import PageHeader from '../../components/UI/PageHeader'
import { useWindowSize } from '../../globalState/globalState'

function AdminDetail({ open }) {
  const [loading, setLoading] = useState(false)
  const width = useWindowSize()
  const { id } = useParams()
  const [adminDetail, setAdminDetail] = useState({})
  useEffect(() => {
    async function fetchAdmin() {
      setLoading(true)
      const { data } = await axios.get('/api/admin/viewAdminDetailById/' + id)
      if (data) {
        setAdminDetail(data)
        setLoading(false)
        console.log(adminDetail)
      }
    }
    fetchAdmin()
  }, [])
  const { fname, mname, lname } = adminDetail
  const name = fname + ' ' + mname + ' ' + lname

  return (
    <PageHeader width={width} title="Admin" subTitle="Admin Detail" open={open}>
      {loading ? (
        <Loader />
      ) : (
        <Detail
          data={adminDetail}
          updateLink={'/updateAdmin/' + adminDetail.id}
        >
          <DetailField label={'Name:'} detail={name} />
          <DetailField label={'Gender:'} detail={adminDetail.gender} />
          <DetailField label={'Blood Group:'} detail={adminDetail.bloodGroup} />
          <DetailField label={'Father Name:'} detail={adminDetail.fatherName} />
          <DetailField label={'Mother Name:'} detail={adminDetail.motherName} />
          <DetailField
            label={'Contact Number:'}
            detail={adminDetail.contactNumber}
          />
          <DetailField
            label={'Emergency Contact Number:'}
            detail={adminDetail.emergencyContactNumber}
          />
          <DetailField label={'Email Address:'} detail={adminDetail.email} />
          <DetailField label={'Join date:'} detail={adminDetail.joiningDate} />
          <DetailField label={'Earning:'} detail={adminDetail.totalEarning} />
        </Detail>
      )}
    </PageHeader>
  )
}

export default AdminDetail
