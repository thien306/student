import './App.css';
import React from "react";
import StudentListFunc from "./component/student/StudentListFunc";
import StudentCreate from "./component/student/StudentCreate";
import StudentEdit from "./component/student/StudentEdit";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <>
        <BrowserRouter>
          <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink to="/student" className="nav-link">Danh sách</NavLink>
              <NavLink to="/create" className="nav-link">Thêm mới</NavLink>
            </nav>
            <Routes>
              <Route path="/create" element={<StudentCreate />} />
              <Route path="/student" element={<StudentListFunc />} />
              <Route path="/edit/:id" element={<StudentEdit />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </>
  );
}

export default App;
