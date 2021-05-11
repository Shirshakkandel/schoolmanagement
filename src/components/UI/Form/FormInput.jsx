import React from 'react'
function FormInput({
  label,
  type = 'text',
  value,
  name,
  onChange,
  errors,
  placeholder,
}) {
  const id = name
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(/[^a-z]+/g, ''))
    .join('-')

  return (
    <div className="group flex flex-col">
      <label htmlFor={id} className="mb-2 pl-1">
        {label}
      </label>
      <input
        id={id}
        className={`h-10 mb-2 outline-none bg-gray-300 p-2 ${
          errors && 'border-red-500 border-2'
        } `}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />

      {errors && <p className="ml-1 font-semibold text-red-500">{errors}</p>}
    </div>
  )
}
function SelectInput({ label, onChange, name, options, value, errors }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 pl-1">{label}</label>
      <select
        className="h-10 mb-2 outline-none bg-gray-300 p-2"
        value={value}
        onChange={onChange}
        name={name}
      >
        {options.map(({ label, value }) => (
          <option key={label} className="outline-none" value={value}>
            {label}
          </option>
        ))}
      </select>

      {errors && <p className=" text-red-500">{errors}</p>}
    </div>
  )
}

export { FormInput, SelectInput }
