import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'

export default function AllStudent({ width, open, title, subTitle }) {
  const [q, setQ] = useState()
  const [searchColumns, setSearchColumn] = useState(['fname'])
  const [students, setStudent] = useState([])
  const history = useHistory()
  // const [fname, lname] = [...columns]
  const searchHandler = () => {}

  async function deleteStudent(id) {
    // async function deleteone() {
    await axios.delete(`api/student/deleteStudentDetailById/${id}`)

    // }
    // deleteone()
  }

  useEffect(() => {
    async function fetchAllStudent() {
      try {
        const { data } = await axios.get(`/api/student/getAllStudentDetail`)
        setStudent(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllStudent()
  }, [])

  return (
    <AllStudentStyle
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

      <div className="searchbox flex flex-col  p-4 md:flex-row  justify-evenly ">
        <input
          type="text"
          placeholder="Search by Id"
          className="h-12 w-full pl-3 bg-gray-100 text-black mb-4 md:mr-4 focus:outline-none"
          onChange={(e) => {
            setQ(e.target.value)
            setSearchColumn(['id'])
          }}
        />
        <input
          className="h-12 w-full pl-3 bg-gray-100 text-black  mb-4 md:mr-4 focus:outline-none "
          type="text"
          placeholder="Search By Name"
          onChange={(e) => {
            setQ(e.target.value)
            setSearchColumn(['fname', 'mname', 'lname'])
          }}
        />
        <input
          type="text"
          placeholder="Search by Class"
          className="h-12 w-full pl-3 bg-gray-100 text-black  mb-4 md:mr-4 focus:ouline-none "
          onChange={(e) => {
            setQ(e.target.value)
            setSearchColumn(['class'])
          }}
        />

        <input
          type="submit"
          onClick={searchHandler()}
          className="h-12 w-full pl-3 bg-yellow-400 text-black  mb-4 md:mr-4 "
        />
      </div>

      <div className="overflow-x-auto mb-6">
        <table>
          <thead>
            <tr>
              {/* {students[0] &&
                columns.map((heading) => <th key={heading}>{heading}</th>)} */}
              <th className="smallsize">Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th className="smallsize">Class</th>
              <th className="smallsize">Section</th>
              <th>Parents</th>
              <th>Address</th>
              <th>Date Of Birth</th>
              <th>Phone</th>
              <th className="bigSize">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(data)} */}
            {students.map(
              ({
                id,
                fname,
                lname,
                mname,
                gender,
                grade,
                sectionName,
                address,
                fatherName,
                dob,
                contactNumber,
                email,
              }) => (
                <tr
                  key={id}
                  onClick={() => deleteStudent(id)}
                  className="hover:opacity-70 cursor-pointer"
                >
                  <td className="smallsize">{id}</td>
                  <td>{`${fname} ${mname} ${lname}`}</td>
                  <td>{gender}</td>
                  <td className="smallsize">{grade}</td>
                  <td className="smallsize">{sectionName}</td>
                  <td>{fatherName}</td>
                  <td>{address}</td>
                  <td>{dob}</td>
                  <td>{contactNumber}</td>
                  <td className="bigSize">{email}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </AllStudentStyle>
  )
}

const AllStudentStyle = styled.div`
  table {
    /* border-collapse: collapse; */
    border-spacing: 0;
    width: 100%;
    table-layout: ${(p) => (p.width <= 786 ? 'fixed' : '')};
    border: 1px solid #ddd;

    th,
    td {
      text-align: left;
      padding: ${(p) => (p.width <= 786 ? '10px' : '8px')};
      width: ${(p) => (p.width <= 786 ? '150px' : '')};
    }

    .smallsize {
      width: ${(p) => (p.width <= 786 ? '60px' : '')};
    }
    .bigSize {
      width: ${(p) => (p.width <= 786 ? '300px' : '')};
    }
    tr:nth-child(even) {
      background-color: #e6d3d3;
    }
  }
`

const TableStyle = styled.table`
  table {
    /* border-collapse: collapse; */
    border-spacing: 0;
    width: 100%;
    table-layout: 'fixed';
    border: 1px solid #ddd;

    th,
    td {
      text-align: left;
      padding: ${(p) => (p.width <= 786 ? '10px' : '8px')};
      width: ${(p) => (p.width <= 786 ? '150px' : '100px')};
    }

    tr:first {
      width: '50px';
    }

    tr:nth-child(even) {
      background-color: #e9dddd;
    }
  }
`
