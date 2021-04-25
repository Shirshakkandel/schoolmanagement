import React, { useState, useRef, useEffect } from 'react'
import { BsBook, BsEnvelope } from 'react-icons/bs'
import { VscThreeBars } from 'react-icons/vsc'

import { IoIosNotificationsOutline, IoMdArrowDropdown } from 'react-icons/io'
import { AiOutlineMessage, AiOutlineSetting } from 'react-icons/ai'
import { HiOutlineLogout } from 'react-icons/hi'
import { RiAccountCircleLine } from 'react-icons/ri'
// import { MdDashboard } from 'react-icons/md'
import { BiSearchAlt } from 'react-icons/bi'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

function Header({ open, setOpen, width }) {
  const [adminDropDown, setAdminDropDown] = React.useState(false)
  const [messageDropDown, setMessageDropDown] = React.useState(false)
  const [notificationDropDown, setNotificationDropDown] = React.useState(false)

  const adminNameRef = useRef(null)
  const adminTitleRef = useRef(null)
  const adminIconRef = useRef(null)
  const adminImgRef = useRef(null)

  const messageRef = useRef(null)
  const notificationRef = useRef(null)

  const logoutHandler = () => {}

  useEffect(() => {
    const close = (e) => {
      setAdminDropDown(
        e &&
          (e.target === adminImgRef.current ||
            e.target === adminTitleRef.current ||
            e.target === adminIconRef.current ||
            e.target === adminNameRef.current)
      )
      adminDropDown &&
        e &&
        (e.target === adminImgRef.current ||
          e.target === adminTitleRef.current ||
          e.target === adminIconRef.current ||
          e.target === adminNameRef.current) &&
        setAdminDropDown(false)
      console.log(adminImgRef.current)
    }

    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [adminDropDown])

  const [messages, setMessages] = useState([
    {
      id: 1,
      image:
        'https://scontent.fktm3-1.fna.fbcdn.net/v/t1.6435-1/c17.0.100.100a/p100x100/172773863_4171159152916585_5365259187878660942_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=7206a8&_nc_ohc=UJ_PFRdeyd8AX8imXRY&_nc_oc=AQnXa0phrOOb_1QPORLLIF2tppJNN85zPh7d9b1_svIlRMlIaBm5LmKepDNc4WAFCzs&_nc_ht=scontent.fktm3-1.fna&tp=27&oh=15c4338c10354dd5eb3eae730f6a0516&oe=60A6277F',
      name: 'Jb Thapa',
      message: 'What is the reason of buy this item.',
      time: '18:30',
    },
    {
      id: 2,
      image:
        'https://scontent.fktm3-1.fna.fbcdn.net/v/t1.18169-1/p100x100/17021413_1854335984847652_907065855827964249_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=7206a8&_nc_ohc=18gVC0o_DjoAX9EVXMU&_nc_ht=scontent.fktm3-1.fna&tp=6&oh=867bab849c9387d84322d8a8184c07bc&oe=60A5F7A6',
      name: 'Shirshak Kandel',
      message: 'What is the reason of buy this item.',
      time: '18:30',
    },
    {
      id: 3,
      image: '',
      name: 'Shirshak Kandel',
      message: 'What is the reason of buy this item.',
      time: '18:30',
    },
    {
      id: 4,
      image: '',
      name: 'Shirshak Kandel',
      message: 'What is the reason of buy this item.',
      time: '18:30',
    },
  ])

  const [notification, setNotification] = useState([
    { id: 1, title: 'Complete Today Task', time: 1 },
    { id: 2, title: 'Director Metting', time: 20 },
    { id: 3, title: 'Update Password', time: 45 },
  ])

  return (
    <HeaderStyle
      adminDropDown={adminDropDown}
      className={`flex ml-1 space-x-2  h-16 items-center ml-${
        width >= 1024 && open ? 80 : 0
      } md:space-x-20 justify-between mr-10`}
    >
      {/* Headerleft */}
      <div className={`header cursor-pointer z-${open ? 0 : 50}`}>
        <VscThreeBars
          size={40}
          onClick={() => setOpen(!open)}
          className={`cursor-pointer`}
        />
      </div>

      {/* Header Middle in large screen */}
      <div className="searchGroup bg-white hidden  md:flex items-center space-x-1 ">
        <BiSearchAlt size={25} />
        <input type="text" placeholder="Find something..." />
      </div>

      {/* Header Right  */}
      <div className="header__right flex space-x-3 items-center relative mr-3">
        {/* {Admin box} */}
        <div className="cursor-pointer flex flex-col relative">
          <div
            className=" accountInfo flex items-center space-x-1"
            onClick={() => setAdminDropDown(!adminDropDown)}
          >
            <div className="">
              <div className="dropdown__header">
                <h3 ref={adminNameRef} className="font-bold ">
                  Shirshak kandel
                </h3>
                <p ref={adminTitleRef} rclassName="ml-auto font-light">
                  Admin
                </p>
              </div>
            </div>

            <div className="dropdown font-light">
              <IoMdArrowDropdown ref={adminIconRef} />
            </div>

            <div className="adminImage ">
              <img
                src="../../images/admin.jpg"
                className=" rounded-full"
                alt="Admin"
                ref={adminImgRef}
              />
            </div>
          </div>

          <div
            className={`dropdown__body absolute ${
              adminDropDown ? 'block' : ' hidden'
            } z-40 transition-all duration-500 ease-in-out  `}
          >
            <div className="header bg-yellow-400 border-none">
              <h3 className="font-bold  text-gray-200 p-4">Shirshak Kandel</h3>
            </div>

            <div className="list bg-gray-200 ">
              <Link
                to="/profile"
                className="flex  items-center space-x-2 pl-10 p-3 hover:bg-gray-300"
              >
                <RiAccountCircleLine />
                <div>My Profile</div>
              </Link>
              <Link
                to="/task"
                className="flex  items-center space-x-2 pl-10 p-3 hover:bg-gray-300"
              >
                <BsBook /> <div>Task</div>
              </Link>
              <Link
                to="/message"
                className="flex  items-center space-x-2 pl-10 p-3 hover:bg-gray-300"
              >
                {' '}
                <AiOutlineMessage />
                <div>Message</div>
              </Link>
              <Link
                to="/setting"
                className="flex  items-center space-x-2 pl-10 p-3 hover:bg-gray-300"
              >
                {' '}
                <AiOutlineSetting /> <div>Account Setting</div>
              </Link>
              <Link
                to="/logout"
                className="flex  items-center space-x-2 pl-10 p-3 hover:bg-gray-300"
                onClick={logoutHandler}
              >
                <HiOutlineLogout /> <div>Logout</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Message box */}
        <div ref={messageRef} className="message flex flex-col ">
          <div
            className="message__body flex items-center space-x-1  cursor-pointer relative"
            onClick={() => setMessageDropDown(!messageDropDown)}
          >
            <div>
              {' '}
              <BsEnvelope size={25} />
            </div>
            <div className="badge bg-green-500 ">5</div>
          </div>

          <div
            className={`dropdown__body message__body absolute ${
              messageDropDown ? 'show' : ' hidden'
            } z-40 transition-all duration-500 ease-in-out `}
          >
            <div className="header bg-yellow-400 border-none">
              <h3 className="font-bold  text-gray-200 p-4">05 Message</h3>
            </div>

            <div className="bg-gray-200 ">
              {messages.map(({ id, image, name, message, time }) => (
                <div key={id} className="message__body flex pb-3 ">
                  <div className="flex items-center img p-1">
                    <img
                      className=" rounded-full h-10"
                      src={image}
                      alt="Message"
                    />
                  </div>

                  <div className="content flex-1">
                    <div className="message__title flex justify-between px-2">
                      <div>{name}</div>
                      <div>{time}</div>
                    </div>

                    <div className="message__body">{message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notification */}
        <div ref={notificationRef} className="notification flex flex-col ">
          <div
            className="message__body flex items-center space-x-1 relative cursor-pointer"
            onClick={() => setNotificationDropDown(!notificationDropDown)}
          >
            <div>
              <IoIosNotificationsOutline size={25} />
            </div>
            <div className="badge bg-red-500">5</div>
          </div>

          <div
            className={`dropdown__body message__body absolute ${
              notificationDropDown ? ' show' : ' hidden'
            } z-40 transition-all duration-500 ease-in-out `}
          >
            <div className="header bg-yellow-400 border-none">
              <h3 className="font-bold  text-gray-200 p-4">05 Message</h3>
            </div>

            <div className="bg-gray-200 ">
              {notification.map(({ id, title, time }) => (
                <div
                  key={id}
                  className="message__body flex justify-center pb-3 "
                >
                  <div className="content flex" key={id}>
                    <div className="message__title flex  flex-col">
                      <div>{title}</div>
                      <div>{time} minutes ago</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HeaderStyle>
  )
}
export default Header

const HeaderStyle = styled.div`
  transition: all 0.5s ease-in-out;

  input:focus {
    outline: 0;
  }
  .header {
    transition: all 0.5s ease-in-out;
  }
  .dropdown {
    margin-top: -25px;
  }

  .adminDropDown {
    min-width: 250px;
    background-color: #e6dddd;
    bottom: -40px;
  }

  .message__list {
    right: 10%;
  }

  .show {
    display: block;
    transition: all 1000ms ease-in;
  }

  .dropdown__body {
    top: 125%;
    left: 0%;
    min-width: 250px;
    /* border: 1px solid rgba(0, 0, 0, 0.04); */
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    background-color: #f8dede;
    text-align: center;
    /* animation: dropdownanimate 200ms ease-in forwards; */
  }

  .message__body {
    left: 10px;
  }

  .badge {
    position: absolute;
    top: -14px;
    right: -15px;
    height: 30px;
    width: 30px;
    line-height: 28px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;

    border: 2px solid #ffffff;
    border-radius: 50%;
    display: block;
    text-align: center;
  }

  .message__list {
    left: -400%;
    min-width: 300px;
  }

  @keyframes dropdownanimate {
    0% {
      transform: translateY(200%);
    }
    100% {
      transform: translateY(300%);
    }
  }
`
