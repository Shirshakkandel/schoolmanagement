import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {Route, Switch, useLocation } from 'react-router-dom'
import AddNewBook from './Pages/Library/AddNewBook';
import BookList from './Pages/Library/BookList';
import AllStudent from './Pages/Student/AllStudent';
import { AddNewStudent } from './Pages/Student/AddNewStudent';
import AddNewTeacher from './Pages/Teacher/AddNewTeacher';
import StudentDetails from './Pages/Student/StudentDetails';
import UpdateStudent from './Pages/Student/UpdateStudent';
import AddParent from './Pages/Parent/AddParent';
import AllParent from './Pages/Parent/AllParent';
import ParentDetails from './Pages/Parent/ParentDetails';
import UpdateParent from './Pages/Parent/UpdateParent';
import Subject from './Pages/Subject';
import AddAdmin from './Pages/Admin/AddAdmin';
import AdminList from './Pages/Admin/AdminList';
import AdminDetail from './Pages/Admin/AdminDetail';
import UpdateAdmin from './Pages/Admin/UpdateAdmin';
import Teachers from './Pages/Teacher/Teachers';
import TeacherDetail from './Pages/Teacher/TeacherDetail';
import UpdateTeacher from './Pages/Teacher/UpdateTeacher';

import AddAttendence from './Pages/Attendence/AddAttendence';
import Attendence from './Pages/Attendence/Attendence';
import UpdateAttendance from './Pages/Attendence/UpdateAttendence';
import AttendenceDetail from './Pages/Attendence/AttendenceDetail';
import Notice from './Pages/Notice';
import AddExam from './Pages/Exam/AddExam';
import AllExam from './Pages/Exam/AllExam';
import Routine from './Pages/Routine';
import RoutineList from './Pages/RoutineList';
import UpdatetRoutine from './Pages/UpdatetRoutine';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation()

  //Automatic window size listner
  function useWindowSize() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {

      const handleResize = () => {
        setWidth(window.innerWidth);
      }
      
      window.addEventListener("resize", handleResize)

      return () => {
        window.addEventListener("resize", handleResize)
      }
    }, [width]);
      return width;
    }
  


  return (
    // Main App
   
   
    <div className="bg-gray-50 ">
      {/* Header */}
      <Header open={open} setOpen={setOpen} width={useWindowSize()}/>
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} width={useWindowSize()} />
      {/* Main */}
        <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Dashboard open={open} setOpen={setOpen} width={useWindowSize()} />
          </Route>

            <Route path="/addNewBook">  
              <AddNewBook title="Library" subTitle="Add New Book" open={open} width={useWindowSize()} />
            </Route>
          
            <Route path="/bookList">
              <BookList title="Library" subTitle="All Books" open={open} width={useWindowSize()} />
            </Route>

          <Route path="/admissionForm/">
            <AddNewStudent title="Students" subTitle="Student Admit Form" open={open} width={useWindowSize()}/>
          </Route>

          <Route path="/updateStudentForm/:id">
            <UpdateStudent title="Student" subTitle="Student Update Form " open={open}/>
          </Route>

          <Route path="/studentdetails/:id">
            <StudentDetails title="Students" subTitle="Student Detail" open={open} width={useWindowSize()}/>
          </Route>

          <Route path="/studentslist">
            <AllStudent title="Students" subTitle="All Student List" open={open} width={useWindowSize()} />
          </Route>

           <Route path="/addteacher">
            <AddNewTeacher  open={open}  />
          </Route>

            <Route path="/teacherlist">
            <Teachers  open={open}  />
          </Route>

          
          <Route path="/teacherDetail/:id">
            <TeacherDetail open={open} />
          </Route>

          <Route path="/updateTeacher/:id">
            <UpdateTeacher open={open} />
          </Route>

           <Route path="/addParent">
            <AddParent title="Parent" subTitle="Add Parent" open={open} width={useWindowSize()} />
          </Route>
          
          <Route path="/allParents">
            <AllParent title="Parent" subTitle="All Parent" open={open} width={useWindowSize()} />
          </Route>

          <Route path="/parentDetails/:id">
            <ParentDetails title="Parent" subTitle="Parent Detail" open={open} width={useWindowSize()}/>
          </Route>

           <Route path="/updateParentForm/:id">
            <UpdateParent  open={open} width={ useWindowSize()}/>
          </Route>
          
           <Route path="/subject">
            <Subject  open={open} />
          </Route>

          <Route path="/addAdmin">
            <AddAdmin open={open}/>
          </Route>

          <Route path="/adminList">
            <AdminList open={open }/>
          </Route>

            <Route path="/adminDetail/:id">
            <AdminDetail open={open }/>
          </Route>

           <Route path="/updateAdmin/:id">
            <UpdateAdmin open={open}/>
          </Route>

          
          <Route path="/addAttendence">
            <AddAttendence open={open}/>
          </Route>

          <Route path="/attendenceList">
            <Attendence open={open }/>
          </Route>

            <Route path="/attendenceDetail/:id">
            <AttendenceDetail open={open }/>
          </Route>

           <Route path="/updateAttendence/:id">
            <UpdateAttendance open={open}/>
          </Route>

           <Route path="/notice">
            <Notice open={open}/>
          </Route>

          <Route path="/addexam">
            <AddExam open={open}/>
          </Route>

           <Route path="/allexam">
            <AllExam open={open}/>
          </Route>
           
          <Route path="/routine">
            <Routine open={open }/>
          </Route>

          <Route path="/routineList">
            <RoutineList open={open}/>
          </Route>

          <Route path="/updateroutine/:id">
            <UpdatetRoutine open={open}/>
          </Route>
          </Switch>
           </AnimatePresence>
        </div>
     
    
    
  );
}
export default App;