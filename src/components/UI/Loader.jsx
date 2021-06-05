import { CircularProgress } from '@material-ui/core'
import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center mt-32 ml-20 h-screen">
      <CircularProgress />
    </div>
  )
}
export default Loader
