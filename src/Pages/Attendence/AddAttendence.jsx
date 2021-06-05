import React from 'react'
import FormContainer from '../../components/UI/Form/FormContainer'
import PageHeader from '../../components/UI/PageHeader'
import { useWindowSize } from '../../globalState/globalState'

function AddAttendence({ open }) {
  const width = useWindowSize()
  return (
    <PageHeader
      title=" Attendence"
      subTitle="Add Attendence"
      width={width}
      open={open}
      onePageTitle="Add Attendence"
    >
      <FormContainer>
        <form type="post">
          
        </form>
      </FormContainer>
    </PageHeader>
  )
}

export default AddAttendence
