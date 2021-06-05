import React, { useState } from 'react'
import useForm from '../../components/customeHook/useForm'
import FormContainer from '../../components/UI/Form/FormContainer'
import { FormInput, SelectInput } from '../../components/UI/Form/FormInput'
import PageHeader from '../../components/UI/PageHeader'
import { useWindowSize } from '../../globalState/globalState'

function AllExam({ open }) {
  const width = useWindowSize()

  useForm()

  return (
    <PageHeader open={open} title="Exam" subTitle="All Exam" width={width}>
      {/* <form action="" type="post">
        <FormContainer>
          <FormInput label="Exam Name" name="examName" />

          <SelectInput
            value={values.grade}
            label="Grade *"
            name="grade"
            onChange={handleChange}
            options={[
              {
                id: 1,
                label: 'Please Select Class *',
                value: '',
              },
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
            ]}
            errors={errors.grade}
          />
        </FormContainer>
      </form> */}
    </PageHeader>
  )
}

export default AllExam
