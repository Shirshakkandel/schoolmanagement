import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

function SidebarMenu({ id, name, icon, up, down, subMenu, to }) {
    
    const [dropdown, setDropDown] = useState(false);
    return (
        
        <SidebarMenuStyle key={id} >
            {/* MenuItems List */}

            {
                !to ? (
                <div onClick={() => setDropDown(!dropdown)} className=" pl-7 py-2 space-x-4 flex justify-between space-x-2 pr-3  text-lg items-center cursor-pointer hover:bg-gray-800">
                    <div className="menuleft flex items-center space-x-2">
                        <span>{icon}</span>
                        <span>{name}</span>
                    </div>
                    <div className="transition-all duration-500 ease-in mr-1">{dropdown ? up : down}</div>
                    </div>
                ) : (
                        <Link to={to}>
                            <div onClick={() => setDropDown(!dropdown)} className=" pl-7 py-2 space-x-4 flex justify-between space-x-2 pr-3 text-lg items-center cursor-pointer hover:bg-gray-800">
                                <div className="menuleft flex items-center space-x-2">
                                    <span>{icon}</span>
                                    <span>{name}</span>
                                </div>
                                <div className="transition-all duration-500 ease-in mr-1">{dropdown ? up : down}</div>
                            </div>
                        </Link>
                        
                )
            }

           

            {/* DropDown menu */}
            {subMenu && dropdown && (
                <div  className="dropdown bg-gray-800">
                    {subMenu.map(({ title, to, side }) =>
                        <Link key={id} to={to} className="submenu flex items-center pl-12  py-1 space-x-1  hover:bg-gray-600 ">
                            <span> {side}</span>
                            <span> {title} </span>
                        </Link>
                    )}
             </div>

            )}
        </SidebarMenuStyle>
    )
}

export default SidebarMenu

const SidebarMenuStyle = styled.div`
border-bottom: 1px solid #021933;


`


