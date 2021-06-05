import { CircularProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { DetailField } from '../../components/UI/DetailField'

export default function ParentDetails({ open, title, subTitle, width }) {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [parentDetail, setParentDetail] = useState({})
  const history = useHistory()

  useEffect(() => {
    async function fetchParentDetail() {
      const { data } = await axios.get(`/api/parent/viewParentDetailById/${id}`)
      if (data) {
        setParentDetail(data)
        setLoading(false)
      }
    }
    fetchParentDetail()
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
    motherName,
    fatherOccupation,
  } = parentDetail

  const name = `${fname} ${mname} ${lname}`
  return (
    <div
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
        <div className="flex justify-center mt-32 h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div className="card  bg-white flex flex-col space-x-4 p-1 md:flex-row md:p-5 md:space-x-10">
          <img
            className="image mx-auto mb-3"
            src={`${
              gender === 'Female'
                ? '/images/femaleStudent.jpg'
                : '/images/maleStudent.png'
            }`}
          />
          <div className="right flex flex-col flex-1">
            <div className="heading flex justify-between ">
              <h2 className="font-extrabold text-gray-600 mb-5 w-2/4">
                {name}
              </h2>
              <div className="icon">
                <button
                  onClick={() => history.push(`/updateParentForm/${id}`)}
                  className="hover:cursor focus:outline-none mr-6  bg-red-600 p-2 text-white text-center"
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
          </div>
        </div>
      )}
    </div>
  )
}
