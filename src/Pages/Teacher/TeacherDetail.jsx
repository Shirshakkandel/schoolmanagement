import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Detail from '../../components/HigherCompoent/Detail'
import { DetailField } from '../../components/UI/DetailField'
import Loader from '../../components/UI/Loader'
import PageHeader from '../../components/UI/PageHeader'
import { useWindowSize } from '../../globalState/globalState'

function TeacherDetail({ open }) {
  const width = useWindowSize()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const [teacherDetail, setTeacherDetail] = useState({})
  const { fname, mname, lname } = teacherDetail
  const name = `${fname} ${mname} ${lname} `

  useEffect(() => {
    async function fetchAdmin() {
      setLoading(true)
      const { data } = await axios.get(
        '/api/teacher/viewTeacherDetailById/' + id
      )
      if (data) {
        setTeacherDetail(data)
        setLoading(false)
        // console.log(teacherDetail)
      }
    }
    fetchAdmin()
  }, [])
  return (
    <PageHeader
      width={width}
      open={open}
      title="Teacher"
      subTitle="Teacher Detail"
    >
      {loading ? (
        <Loader />
      ) : (
        <Detail
          data={teacherDetail}
          name={name}
          updateLink={`/updateTeacher` + teacherDetail.id}
        >
          <DetailField label={'Name:'} detail={name} />
          <DetailField label={'Gender:'} detail={teacherDetail.gender} />
          <DetailField
            label={'Father Name:'}
            detail={teacherDetail.fatherName}
          />
          <DetailField label={'Date of Birth:'} detail={teacherDetail.dob} />
          <DetailField
            label={'Mother Name:'}
            detail={teacherDetail.motherName}
          />
          <DetailField
            label={'Contact Number:'}
            detail={teacherDetail.contactNumber}
          />
          <DetailField
            label={'Emergency Contact Number:'}
            detail={teacherDetail.emergencyContactNumber}
          />
          <DetailField label={'Email Address:'} detail={teacherDetail.email} />
          <DetailField label={'Grade:'} detail={teacherDetail.grade} />
          <DetailField
            label={'Class Teacher:'}
            detail={teacherDetail.isClassTeacher}
          />
          <DetailField label={'Earning:'} detail={teacherDetail.totalEarning} />
        </Detail>
      )}
    </PageHeader>
  )
}

export default TeacherDetail
