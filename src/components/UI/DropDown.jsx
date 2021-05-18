import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

export default function DropDown({
  options,
  prompt,
  value,
  onChange,
  id,
  label,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    const close = (e) => {
      setOpen(e && (e.target === ref.current || e.target === arrowRef.current))

      open &&
        e &&
        (e.target === ref.current || e.target === arrowRef.current) &&
        setOpen(false)
    }

    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  function filter(options) {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }
  function displayValue() {
    if (query.length > 0) return query
    if (value) return value
    return ''
  }
  return (
    <DropDownFilter>
      <div className="dropdown">
        <div className="control">
          <div className="selected-value">
            <input
              ref={ref}
              type="text"
              value={displayValue()}
              placeholder={value ? value[label] : prompt}
              onChange={(e) => {
                setQuery(e.target.value)
                onChange(null)
              }}
            />
            {/* {value ? value[label] : prompt} */}
          </div>
          <div className={`arrow ${open ? 'open' : null}`} ref={arrowRef} />
        </div>

        <div className={`options ${open ? 'open' : null}`}>
          {open &&
            filter(options).map((option, index) => (
              <div
                // tabIndex="0"
                // onBlur={() => setOpen(false)}
                key={option[id]}
                className={`option ${value === option ? 'selected' : null}`}
                onClick={() => {
                  setQuery('')
                  onChange(option[label], option[id])
                  setOpen(false)
                }}
              >
                {option[label]}
              </div>
            ))}
        </div>
      </div>
    </DropDownFilter>
  )
}

const DropDownFilter = styled.div`
  /* width: 300px; */
  margin-top: 8px;
  .dropdown {
    position: relative;
    color: #333;
    cursor: default;
  }

  .dropdown .arrow {
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: ' ';
    display: block;
    height: 0;
    margin-top: 0.3rem;
    position: absolute;
    right: 10px;
    top: 14px;
    width: 0;
  }

  .dropdown .arrow.open {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }

  .dropdown .selected-value input {
    line-height: 1.5;
    font-size: 1rem;
    background-color: #e6dede;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: default;
    outline: none;
    padding: 8px 52px 8px 10px;
    transition: all 200ms ease;
    width: 100%;
  }

  .dropdown .options {
    display: none;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-top: -1px;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }

  .dropdown .options.open {
    display: block;
  }

  .dropdown .option {
    box-sizing: border-box;
    color: rgba(51, 51, 51, 0.8);
    cursor: pointer;
    display: block;
    padding: 8px 10px;
  }

  .dropdown .option.selected,
  .dropdown .option:hover {
    background-color: #f2f9fc;
    color: #333;
  }
`
