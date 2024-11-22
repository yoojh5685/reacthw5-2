import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentCreat from "./Components/StudentCreat";
import StudentList from "./Components/StudentList";
import StudentDetail from "./Components/StudentDetail";
import StudentUpdate from "./Components/StudentUpdate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/list" />} />
      <Route path="/list" element={<StudentList />} />
      <Route path="/create" element={<StudentCreat />} />
      <Route path="/detail" element={<StudentDetail />} />
      <Route path="/update" element={<StudentUpdate />} />
    </Routes>
  </BrowserRouter>
);
