import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {BrowserRouter,Route, Switch } from 'react-router-dom'
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


function App() {
  const [open, setOpen] = useState(false);
 

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
    <BrowserRouter>
   
    <div className="bg-gray-50 ">
      {/* Header */}
      <Header open={open} setOpen={setOpen} width={useWindowSize()}/>
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} width={useWindowSize()} />
        {/* Main */}
        
       

        <Switch>
           
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

          </Switch>
        </div>
     
    
    </BrowserRouter>
  );
}
export default App;