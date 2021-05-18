import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
// import Dropdown from '../../components/UI/dropdown'

export default function AllStudent({ width, open, title, subTitle }) {
  const data = [
    { id: 2, label: 'Play', value: 'Play' },
    { id: 3, label: 'One', value: 'One' },
    { id: 4, label: 'Two', value: 'Two' },
    { id: 5, label: 'Three', value: 'Three' },
    { id: 6, label: 'Four', value: 'Four' },
    { id: 7, label: 'Five', value: 'Five' },
    { id: 8, label: 'Six', value: 'Six' },
    { id: 9, label: 'Seven', value: 'Seven' },
    { id: 10, label: 'Eight', value: 'Eight' },
    { id: 11, label: 'Nine', value: 'Nine' },
    { id: 12, label: 'Ten', value: 'Ten' },
  ]

  const [q, setQ] = useState('Ten')
  const [grade, setGrade] = useState('Ten')

  const [searchColumns, setSearchColumns] = useState(['grade'])
  const [students, setStudents] = useState([])
  const history = useHistory()
  // const [fname, lname] = [...columns]
  const searchHandler = () => {}

  async function deleteStudent(id) {
    // async function deleteone() {
    let result = window.confirm('Are you sure you want to delete ?')
    if (result) {
      await axios.delete(`api/student/deleteStudentDetailById/${id}`)
    }
  }

  function search(rows) {
    return rows.filter(
      (row) =>
        searchColumns &&
        searchColumns.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
    )
  }

  useEffect(() => {
    async function fetchAllStudent() {
      try {
        const { data } = await axios.get(`/api/student/getAllStudentDetail`)
        setStudents(data)
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

      <div className="searchBox grid grid-cols-1 gap-2  md:grid-cols-3">
        <div className="flex flex-col">
          <label className="m-1 pl-1  text-gray-500" htmlFor="id">
            Search by Id
          </label>
          <input
            type="text"
            id="id"
            placeholder="Search By Id"
            className="h-12 w-full pl-3 bg-gray-100 text-black mb-4 md:mr-4 focus:outline-none"
            onChange={(e) => {
              setQ(e.target.value)
              setSearchColumns(['id'])
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="m-1 pl-1 text-gray-500" htmlFor="Name">
            Search By Name
          </label>
          <input
            id="Name"
            className="h-12 w-full  pl-3 bg-gray-100 text-black  mb-4 md:mr-4 focus:outline-none "
            type="text"
            placeholder="Search By Name"
            onChange={(e) => {
              setQ(e.target.value)
              setSearchColumns(['fname', 'mname', 'lname'])
            }}
          />
        </div>

        <div className="flex flex-col">
          <label className="m-1 pl-1 text-gray-500" htmlFor="Class">
            Search By Class
          </label>
          <input
            id="Class"
            type="text"
            placeholder="Search by Class"
            className="h-12 w-full  pl-3 bg-gray-100 text-black  mb-4 md:mr-4 focus:outline-none "
            value={grade}
            onChange={(e) => {
              setQ(e.target.value)
              setGrade(e.target.value)
              setSearchColumns(['grade'])
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <DataTable
          data={search(students)}
          width={width}
          deleteStudent={deleteStudent}
        />
        {/* Create DataTable pass search(rows) */}
      </div>
    </AllStudentStyle>
  )
}

function DataTable({ data, width, deleteStudent }) {
  let history = useHistory()
  async function detailView(id) {
    history.push(`/studentdetails/${id}`)
  }
  return (
    <TableStyle width={width}>
      <thead>
        <tr>
          {/* {students[0] &&
                columns.map((heading) => <th key={heading}>{heading}</th>)} */}
          <th className="smallsize">Id</th>
          <th>Name</th>
          <th className="smallsize">Gender</th>
          <th className="smallsize">Class</th>
          <th className="smallsize">Section</th>
          <th>Parents</th>
          <th>Address</th>
          <th>Date Of Birth</th>
          <th>Phone</th>
          <th className="bigSize">E-mail</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* {console.log(data)} */}
        {data.map(
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
              onClick={() => {
                // history.push(`/studentsDetails/${id}`)
              }}
              key={id}
              //
              className="hover:opacity-70 cursor-pointer "
            >
              <td className="smallsize">{id}</td>
              <td className="">{`${fname} ${mname} ${lname}`}</td>
              <td>{gender}</td>
              <td className="smallsize">{grade}</td>
              <td className="smallsize">{sectionName}</td>
              <td>{fatherName}</td>
              <td>{address}</td>
              <td>{dob}</td>
              <td>{contactNumber}</td>
              <td className="bigSize">{email}</td>
              <td className="bigSize">
                <span
                  className="hover:text-green-700 pr-2"
                  onClick={() => detailView(id)}
                >
                  Details
                </span>
                <span
                  className="hover:text-gray-800 pr-1"
                  onClick={() => history.push(`updateStudentForm/${id}`)}
                >
                  Update
                </span>
                <div
                  className="hover:text-red-500 pr-1 mt-1"
                  onClick={() => deleteStudent(id)}
                >
                  Delete
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </TableStyle>
  )
}

const AllStudentStyle = styled.div`
  table {
    /* border-collapse: collapse; */
    border-spacing: 0;
    width: 100%;
    table-layout: ${(p) => (p.width <= 1024 ? 'fixed' : '')};
    border: 1px solid #ddd;

    th,
    td {
      text-align: left;
      border: 1px solid #332d2d;
      padding: ${(p) => (p.width <= 786 ? '10px' : '8px')};
      width: ${(p) => (p.width <= 786 ? '150px' : '')};
    }

    .smallsize {
      width: ${(p) => (p.width <= 786 ? '80px' : '')};
    }
    .bigSize {
      width: ${(p) => (p.width <= 786 ? '230px' : '')};
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
