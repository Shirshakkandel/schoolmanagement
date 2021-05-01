import React, { useEffect, useState } from 'react'
import { BsFillBarChartFill } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { CgArrowsVAlt } from 'react-icons/cg'
import { FaCartArrowDown, FaMoneyBillAlt } from 'react-icons/fa'

import Chart from 'react-apexcharts'
import styled from 'styled-components/macro'
import { RiParentLine } from 'react-icons/ri'
import { HiOutlineUserGroup } from 'react-icons/hi'
import ReactApexChart from 'react-apexcharts'

function Dashboard({ width, open }) {
  const [stackChart, setStackChart] = useState({
    options: {
      chart: {
        zIndex: 30,
      },
    },

    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],

    labels: ['A', 'B', 'C', 'D', 'E'],
  })

  //Expeses data
  const [expensesData, setExpensesData] = useState({
    options: {
      chart: {
        zIndex: 30,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar'],
        position: 'bottom',
        axisBorder: {
          show: false,
        },
      },
    },
    series: [{ data: [75000, 90000, 80000] }],
  })

  //Studnets Number data
  const [studentsData, setStudentsData] = useState({
    series: [700, 800],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: ['Male', 'Female'],

      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: 'true',
      },

      fill: {
        type: 'gradient',
      },
      // legend: {
      //   formatter: function (val, opts) {
      //     return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
      //   },
      // },
      // title: {
      //   text: 'Gradient Donut with custom Start-angle',
      // },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  })

  //Notice Data

  const [noticeData, setNoticeData] = useState([
    {
      id: 1,
      date: '23 04,2021',
      notice: 'Greate school management planning',
      author: 'Shirshak kandel',
      ago: '5 min ago',
    },
    {
      id: 2,
      date: '23 04,2021',
      notice: 'Greate school management planning',
      author: 'Shirshak kandel',
      ago: '5 min ago',
    },
    {
      id: 3,
      date: '23 04,2021',
      notice: 'Greate school management planning',
      author: 'Shirshak kandel',
      ago: '5 min ago',
    },
    {
      id: 4,
      date: '23 04,2021',
      notice: 'Greate school management planning',
      author: 'Shirshak kandel',
      ago: '5 min ago',
    },
    // {
    //   id: 5,
    //   date: '23 04,2021',
    //   notice: 'Greate school management planning',
    //   author: 'Shirshak kandel',
    //   ago: '5 min ago',
    // },
  ])
  const [adminData, setAdminData] = useState([
    {
      id: 1,
      icon: <RiParentLine size="40" color="#0e8859" background="red" />,
      title: 'Students',
      number: 15000,
      bg: 'bg-green-200',
    },
    {
      id: 2,
      icon: <HiOutlineUserGroup size="40" color="#2a27b8" />,
      title: 'Teacher',
      number: 2250,
      bg: 'bg-blue-200',
    },
    {
      id: 3,
      icon: <RiParentLine size="40" color="#dde011" />,
      title: 'Parents',
      number: 5690,
      bg: 'bg-yellow-200',
    },
    {
      id: 4,
      icon: <FaMoneyBillAlt size="40" color="#a31616" />,
      title: 'Earning',
      number: 19300,
      bg: 'bg-red-200',
    },
  ])

  const percentageDate = [
    { id: 1, heading: 'Profile', percentage: 82, color: 'red' },
    { id: 2, heading: 'No of Visits', percentage: 46, color: 'yellow' },
    { id: 3, heading: 'Customer', percentage: 84, color: 'blue' },
    { id: 4, heading: 'Sales', percentage: 55, color: 'green' },
  ]

  const CardItems = [
    {
      id: 1,
      icon: <CgArrowsVAlt size="40" color="#d4caca" />,
      number: 84198,
      heading: 'REVENUE',
      bg: 'bg-green-500',
    },
    {
      id: 2,
      icon: <FaCartArrowDown size="40" color="#d4caca" />,
      number: 36540,
      heading: 'SALES',
      bg: 'bg-blue-500',
    },
    {
      id: 3,
      icon: <BsFillBarChartFill size="40" color="#d4caca" />,
      number: 70,
      heading: 'PRODUCTS',
      bg: 'bg-yellow-500',
    },
    {
      id: 4,
      icon: <FiUsers size="40" color="#d4caca" />,
      number: 86658,
      heading: 'VISITS',
      bg: 'bg-red-500',
    },
  ]

  const numb = React.useRef()

  useEffect(() => {})

  return (
    <MainDashboardStyle
      className={`bg-gray-300 ml-${width > 1024 && open ? 80 : 0} p-5`}
    >
      {/* Header */}
      <div className="header">
        <h1 className="font-bold text-lg"> Dashboard</h1>

        <span className="flex space-x-2 ml-1">
          <p className="text-red-500">Home /</p>
          <p className="text-red-500">Dashboard /</p>
          <p>Data</p>
        </span>
      </div>

      {/* Card */}
      <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 ">
        {adminData.map(({ id, icon, number, title, bg }) => {
          return (
            <div
              key={id}
              className="revenue flex justify-between h-32 bg-gray-200  "
            >
              <div
                className={`iconborder flex items-center text-lg p-5 ${bg} `}
              >
                <span>{icon}</span>
              </div>

              <div className="flex flex-grow-1 flex-col justify-evenly items-end pr-3 ">
                <p className="text-lg  ">{title}</p>
                <p className="text-lg">{number}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className=" gridCustom grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Earning Report */}
        <div className="px-5 card bg-gray-100 p-3">
          <h3 className="header font-bold">Earning</h3>

          <div className="earning-report">
            <div className="item-content flex justify-between space-x-3 lg:flex-row  justify-start ">
              <div className="single__item">
                <h4>Total Collection</h4>
                <span>Rs 75,000</span>
              </div>
              <div className="single__item">
                <h4>Fees Collection</h4>
                <span>Rs 90,000</span>
              </div>
            </div>

            {/* Javascript Stack Area chart */}
            <ReactApexChart
              options={stackChart.options}
              series={stackChart.series}
              type="bar"
              stacked
              width={350}
              height={320}
            />
          </div>
        </div>

        {/* Expenses */}
        <div className="px-5 card bg-gray-100 p-3">
          <div className="header">
            <h3 className="font-bold ">Expenses</h3>
          </div>

          <ReactApexChart
            options={expensesData.options}
            series={expensesData.series}
            type="bar"
            width={350}
            height={320}
          />
        </div>
        {/* Student Number */}

        {/* Expenses */}
        <div className="px-5 card bg-gray-100 p-3 ">
          <div className="header mb-10">
            <h3 className="font-bold ">Students</h3>
          </div>

          <ReactApexChart
            options={studentsData.options}
            series={studentsData.series}
            type="donut"
            width={350}
            height={500}
          />

          <div className="student__report flex justify-between pt-3">
            <div className="Female">
              <h4 className="text-gray-400">Female Students</h4>
              <p className="text-gray-900 font-weight-bold">800</p>
            </div>

            <div className="male">
              <h4 className="text-gray-400">Male Students</h4>
              <p className="text-gray-900 font-weight-bold">700</p>
            </div>
          </div>
        </div>

        <div>Students</div>
        {/* {Event Calender} */}
        <div>Event Calender</div>

        {/* Notice Board */}
        <div className="px-5 bg-gray-100 p-3  overflow-hidden">
          <div className="header mb-10">
            <h3 className="font-bold ">Notice Board</h3>
          </div>

          <div className="body h-5/6  customeScrollbar overflow-y-auto">
            {noticeData.map(({ id, date, notice, author, ago }) => (
              <div key={id} className="py-2">
                <div className=" bg-blue-500 inline-block px-2 text-gray-300 rounded-full">
                  {date}
                </div>
                <div className="py-2 font-bold">{notice}</div>
                <div className="font-light">
                  {author} {`/ `} {ago}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainDashboardStyle>
  )
}

export default Dashboard

const MainDashboardStyle = styled.div`
  transition: all 0.5s ease-in-out;

  .dashboard-card-one
    .card-body
    .earning-report
    .item-content
    .single-item:after {
    content: '';
    height: 18px;
    width: 18px;
    border: 3px solid #ffffff;
    -webkit-box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 20%);
    box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 20%);
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .customeScrollbar {
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #4547be;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #4547be;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #4547be;
    }
  }

  .iconborder {
    border-radius: 60%;
    margin: 10px 20px;
  }

  .gridCustom {
  }
`
