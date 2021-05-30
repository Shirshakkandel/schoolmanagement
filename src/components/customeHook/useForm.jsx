import React, { useState } from 'react'

function useForm(callBack, values, setValues, validate) {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors(validate(values))
  }

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callBack()
    }
  }, [isSubmitting, errors])

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    setValues,
    setErrors,
    setIsSubmitting,
    isSubmitting,
  }
}
export default useForm
