import React, { useRef, useState, useEffect } from 'react'
import './styles.css'

function Dropdown({ options, prompt, value, onChange, id, label }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => {
      // console.dir([e.target, ref.current])
      setOpen(e && e.target === ref.current)
    }

    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  useEffect(() => {
    ;['click', 'touched'].forEach((e) => {
      document.addEventListener(e, toggle)
    })
    return () => {
      ;['click', 'touched'].forEach((e) => {
        document.addEventListener(e, toggle)
      })
    }
  }, [])

  //onChange value setQuery to value
  //   useEffect(() => {
  //     setQuery(value)
  //   }, [value])

  function toggle(e) {
    setOpen(e && e.target === ref.current)
  }

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  function displayValue() {
    if (query.length > 0) return query
    if (value) return value[label]
    return ''
  }

  function selectOption(option) {
    setQuery('')
    onChange(option)
    setOpen(false)
  }

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value">
          <input
            type="text"
            ref={ref}
            placeholder={value ? value[label] : prompt}
            value={displayValue()}
            onChange={(e) => {
              setQuery(e.target.value)
              onChange(null)
            }}
            onClick={toggle}
            onTouchEnd={toggle}
          />
        </div>
        <div className={`arrow ${open ? 'open' : null} `}></div>
      </div>

      <div className={`options ${open ? 'open' : null}  `}>
        {filter(options).map((option) => (
          <div
            key={option[id]}
            className={`option ${value === option ? 'selected' : 'null'}`}
            onClick={() => selectOption(option)}
            onTouchEnd={() => selectOption(option)}
          >
            {option[label]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
