import React, { useEffect } from 'react'
import { GiCircleCage, GiTeacher } from 'react-icons/gi'
import styled from 'styled-components/macro'
import { AiOutlineDashboard } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { CgClipboard } from 'react-icons/cg'
import { FaUserGraduate } from 'react-icons/fa'
import { VscAccount, VscLibrary } from 'react-icons/vsc'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { RiParentFill } from 'react-icons/ri'
import { BiBus, BiNotepad } from 'react-icons/bi'
import SidebarMenu from './SidebarMenu'

function Sidebar({ open, setOpen, width }) {
  //Exit Detail
  const exitDetailHander = (e) => {
    const element = e.target
    if (element.classList.contains('shadow')) {
      setOpen(false)
      // history.push("/");
    }
  }
  useEffect(() => {
    if (width > 1024) {
      setOpen(true)
    }
  }, [width, setOpen])

  // const [dropdown, setDropDown] = useState(false)

  const MenuItems = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <AiOutlineDashboard color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        { id: 1, title: 'Admin', to: '/', side: <MdKeyboardArrowRight /> },
        {
          id: 2,
          title: 'Students',
          to: '/students',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 3,
          title: 'Parents',
          to: '/parents',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 4,
          title: 'Teachers',
          to: '/teachers',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 12,
      name: 'Admin',
      icon: <FaUserGraduate color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All Admin',
          to: '/adminList',
          side: <MdKeyboardArrowRight />,
        },

        {
          id: 2,
          title: 'Add Admin ',
          to: '/addAdmin',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 2,
      name: 'Students',
      icon: <FaUserGraduate color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All Students',
          to: '/studentslist',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Student Details',
          to: '/studentdetails',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 3,
          title: 'Admission Form ',
          to: '/admissionForm',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 4,
          title: 'Student Promotion',
          to: '/studentPromotion',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 3,
      name: 'Libray',
      icon: <VscLibrary color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All Book',
          to: '/bookList',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Add New Book',
          to: '/addNewBook',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },
    {
      id: 11,
      name: 'Subject',
      icon: <BiNotepad color="yellow" />,
      to: '/subject',
    },
    {
      id: 4,
      name: 'Parents',
      icon: <RiParentFill color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All Parents',
          to: '/allParents',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Add Parent',
          to: '/addParent',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 5,
      name: 'Account',
      icon: <VscAccount color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All fee Collection',
          to: '/addcollection',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Expenses',
          to: '/expenses',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 3,
          title: 'Add Expenses',
          to: '/addexpenses',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },
    {
      id: 6,
      name: 'Teacher',
      icon: <GiTeacher color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All Teachers',
          to: '/teacherlist',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Add Teacher',
          to: '/addteacher',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 7,
      name: 'Exam',
      icon: <CgClipboard color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'Add Exam ',
          to: '/addExam',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Exam Detail',
          to: '/allExam',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 8,
      name: 'Attendance',
      icon: <CgClipboard color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'All Attendence',
          to: '/attendenceList',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'Add Attendence',
          to: '/addAttendence',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },

    {
      id: 9,
      name: 'Transport',
      icon: <BiBus color="yellow" />,
      to: '/transport',
    },
    {
      id: 10,
      name: 'Notice',
      icon: <BiNotepad color="yellow" />,
      to: '/notice',
    },

    {
      id: 15,
      name: 'Routine',
      icon: <CgClipboard color="yellow" />,
      up: <IoIosArrowUp />,
      down: <IoIosArrowDown />,
      subMenu: [
        {
          id: 1,
          title: 'Add Routine',
          to: '/routine',
          side: <MdKeyboardArrowRight />,
        },
        {
          id: 2,
          title: 'All Routine',
          to: '/routineList',
          side: <MdKeyboardArrowRight />,
        },
      ],
    },
  ]

  return (
    // Cardshadow
    <Side
      className={`shadow fixed z-40  left-0 top-0 h-full  w-${
        open && width < 1024 ? 'full' : 0
      } `}
      // onClick={() => setOpen(false)}
      onClick={exitDetailHander}
    >
      {/* Sidebar */}
      <SidebarStyled
        open={open}
        className={`fixed left-0 top-0 h-full  bg-gray-700 text-white  z-50
            w-${open ? '8/12' : 0} opacity-${open ? 1 : 0}  } max-w-xs`}
      >
        {/* SidebarHeader */}
        <div className=" bg-red-600 flex items-center space-x-2 p-4">
          <GiCircleCage size={35} />
          <h1 className="text-2xl ">target</h1>
        </div>
        {/* SidebarMenu */}
        <div className="">
          {MenuItems.map(({ id, name, icon, up, down, subMenu, to }) => (
            <div key={id}>
              <SidebarMenu
                name={name}
                icon={icon}
                up={up}
                down={down}
                subMenu={subMenu}
                to={to}
              />
            </div>
          ))}
        </div>
      </SidebarStyled>
    </Side>
  )
}

export default Sidebar

const SidebarStyled = styled.div`
  transform: ${(p) => (p.open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: all 0.5s ease-in-out;
  overflow-y: auto;
  background-color: '#042954';
  /* z-index: 100; */

  /* Styling scrollbar */
  ::-webkit-scrollbar {
    width: ${(p) => (p.width <= 786 ? '5px' : '8px')};
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #a5aaad;
    border-radius: ${(p) => (p.width <= 786 ? '2px' : '3px')};
  }

  ::-webkit-scrollbar-thumb {
    background-color: #7f9289;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a5aaad;
  }
`

const Side = styled.div`
  /* z-index: 100; */
`
