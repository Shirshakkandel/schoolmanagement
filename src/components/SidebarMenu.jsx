import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

function SidebarMenu({ id, name, icon, up, down, subMenu, to }) {
  const [dropdown, setDropDown] = useState(false)
  return (
    <SidebarMenuStyle key={id}>
      {/* MenuItems List */}

      {!to ? (
        <div
          onClick={() => setDropDown(!dropdown)}
          className=" pl-7 py-2 space-x-4 flex justify-between space-x-2 pr-3  text-lg items-center cursor-pointer hover:bg-gray-800"
        >
          <div className="menuleft flex items-center space-x-2">
            <span>{icon}</span>
            <span>{name}</span>
          </div>
          <div className="transition-all duration-500 ease-in mr-1">
            {dropdown ? up : down}
          </div>
        </div>
      ) : (
        <Link to={to}>
          <div
            onClick={() => setDropDown(!dropdown)}
            className=" pl-7 py-2 space-x-4 flex justify-between space-x-2 pr-3 text-lg items-center cursor-pointer hover:bg-gray-800"
          >
            <div className="menuleft flex items-center space-x-2">
              <span>{icon}</span>
              <span>{name}</span>
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, ease: 'easeOut', duration: 0.5 }}
                className={` transition-all duration-500 ease-in mr-1`}
              >
                {dropdown ? up : down}
              </motion.div>
            </AnimatePresence>
          </div>
        </Link>
      )}

      {/* DropDown menu */}

      <div
        className={`${
          dropdown ? 'h-full' : 'h-0'
        } transition-all duration-500  ease-linear overflow-hidden`}
      >
        <AnimatePresence>
          {subMenu && dropdown && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              exit={{ opacity: 0, y: -5, duration: 0.35 }}
              className={`${
                dropdown ? 'h-full' : 'h-0'
              } transition-all duration-500  ease-linear overflow-hidden dropdown bg-gray-800 `}
            >
              {subMenu.map(({ id, title, to, side }) => (
                <Link
                  key={id}
                  to={to}
                  className="submenu flex items-center pl-12  py-1 space-x-1  hover:bg-gray-600 "
                >
                  <span> {side}</span>
                  <span> {title} </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SidebarMenuStyle>
  )
}

export default SidebarMenu

const SidebarMenuStyle = styled.div`
  border-bottom: 1px solid #021933;
`
