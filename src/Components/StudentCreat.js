import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StudentCreate = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "Male",
    height: "",
    weight: "",
  });

  const navigate = useNavigate();

  // 유효성 검사를 위한 refs
  const nameRef = useRef();
  const ageRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!student.name) {
      alert("Name is required.");
      nameRef.current.focus();
      return;
    }
    if (!student.age || student.age <= 0) {
      alert("Age must be greater than 0.");
      ageRef.current.focus();
      return;
    }
    if (!student.height || student.height <= 0) {
      alert("Height must be greater than 0.");
      heightRef.current.focus();
      return;
    }
    if (!student.weight || student.weight <= 0) {
      alert("Weight must be greater than 0.");
      weightRef.current.focus();
      return;
    }

    try {
      const response = await fetch("https://67281ba1270bd0b9755468a5.mockapi.io/ossexample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert("Student created successfully!");
        navigate("/list"); // 리스트 페이지로 이동
      } else {
        throw new Error("Failed to create student.");
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Create New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            ref={nameRef}
            value={student.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            ref={ageRef}
            value={student.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={student.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="height" className="form-label">Height (cm)</label>
          <input
            type="number"
            className="form-control"
            id="height"
            name="height"
            ref={heightRef}
            value={student.height}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            id="weight"
            name="weight"
            ref={weightRef}
            value={student.weight}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Student
        </button>
      </form>
    </div>
  );
};

export default StudentCreate;
