import React from 'react'
import { MdSwapVert } from 'react-icons/md'
import { SButton } from './SButton.styles'
import { TableStyle } from './TableStyle'

function Table({ tableHeader, tableRow, width, sortDataHandler }) {
  return (
    <TableStyle width={width}>
      <thead>
        <tr>
          <th className="smallSize">
            <span className="flex space-x-2">
              <span className="flex items-center">ID</span>
              <span
                className="cursor-pointer"
                onClick={() => sortDataHandler('id')}
              >
                <MdSwapVert size={25} />
              </span>
            </span>
          </th>
          <th className="mediumSize">NAME</th>
          <th>Contact Number</th>
          <th className="emailSize">Email</th>
          <th>TOTAL EARNING</th>
          <th className="bigSize">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {/* {message && message} */}
        {tableRow.map(
          ({ id, fname, mname, lname, contactNumber, email, totalEarning }) => (
            <tr key={id}>
              <td className="smallSize">{id}</td>
              <td>{`${fname} ${mname} ${lname} `}</td>
              <td>{contactNumber}</td>
              <td>{email}</td>
              <td className="emailSize">{totalEarning}</td>
              <td className="bigSize">
                <SButton p={2} green>
                  Details
                </SButton>
                <SButton p={2} blue>
                  Update
                </SButton>
                <SButton p={2} red>
                  Delete
                </SButton>
              </td>
            </tr>
          )
        )}
      </tbody>
    </TableStyle>
  )
}

export default Table
