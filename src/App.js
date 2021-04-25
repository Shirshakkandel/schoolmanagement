import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {BrowserRouter,Route, Switch } from 'react-router-dom'
import AddNewBook from './Pages/Library/AddNewBook';
import BookList from './Pages/Library/BookList';

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

          </Switch>

    
        

         
        

        </div>
     
    
    </BrowserRouter>
  );
}

export default App;


