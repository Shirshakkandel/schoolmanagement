import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

function BookList({ width, open, title, subTitle }) {
  const [bookData, setBookData] = useState([])
  const [q, setQ] = useState('')
  const [searchColumns, setSearchColumn] = useState(['BookName', 'Writer'])
  const columns = bookData[0] && Object.keys(bookData[0])

  const searchHandler = () => {}
  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0])
    // return rows.filter((row) => row.BookName.toLowerCase().indexOf(q) > -1)
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    )
  }

  useEffect(() => {
    // async function fetchBookData() {
    //   let { data } = await axios.get('/books')
    //   setBookData(data)
    //   console.log(data)
    // }

    async function fetchBookData() {
      let response = await fetch('/books/')
      let json = await response.json()
      setBookData(json)
    }
    fetchBookData()
  }, [])

  return (
    <BookListStyle
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

      {/* <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column)
                  setSearchColumn((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  )
                }}
              />
              {column}
            </label>
          ))}
      </div> */}

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
            setSearchColumn(['BookName', 'Writer'])
          }}
        />
        <input
          type="text"
          placeholder="Search by Class"
          className="h-12 w-full pl-3 bg-gray-100 text-black  mb-4 md:mr-4 focus:ouline-none "
          onchange={(e) => {
            setQ(e.target.value)
            setSearchColumn(['Class'])
          }}
        />

        <input
          type="submit"
          onClick={searchHandler()}
          className="h-12 w-full pl-3 bg-yellow-400 text-black  mb-4 md:mr-4 "
        />
      </div>
      <div className="overflow-x-auto mb-6">
        <Table data={search(bookData)} width={width} />
      </div>
      <div className="overflow-x-auto">
        <table className=" ">
          <thead>
            <tr className="">
              <th className="smallsize">ID</th>
              <th>Book Name</th>
              <th>Writer</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Published</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {bookData.map(
              ({
                id,
                BookName,
                Writer,
                Subject,
                Class,
                Published,
                CreatedAt,
              }) => (
                <tr key={id}>
                  <td className="smallsize">{id}</td>
                  <td>{BookName}</td>
                  <td>{Writer}</td>
                  <td>{Subject}</td>
                  <td>{Class}</td>
                  <td>{Published}</td>
                  <td>{CreatedAt}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </BookListStyle>
  )
}

export default BookList

const Table = ({ data, width }) => {
  const columns = data[0] && Object.keys(data[0])
  return (
    <TableStyle cellPadding={0} cellSpacing={0} width={width}>
      <thead>
        <tr>
          {data[0] &&
            columns.map((heading) => <th key={heading}>{heading}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </TableStyle>
  )
}

const TableStyle = styled.table`
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

    tr:first {
      width: '50px';
    }

    tr:nth-child(even) {
      background-color: #e9dddd;
    }
  }
`

const BookListStyle = styled.div`
  overflow-x: hidden;

  .bookTable {
    width: 100%;
    grid-template-columns: ${(p) =>
      p.width <= 1024 && ' 35px 150px 150px 100px 100px 100px 100px'};
  }

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
      width: 50px;
    }
    tr:nth-child(even) {
      background-color: #e9dddd;
    }
  }
`
