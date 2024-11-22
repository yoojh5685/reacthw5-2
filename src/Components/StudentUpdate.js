import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";

const StudentUpdate = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [student, setStudent] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);

  // 각 필드의 유효성 검사를 위한 ref
  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://67281ba1270bd0b9755468a5.mockapi.io/ossexample/${id}`);
        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedStudent = { ...student, [name]: value };

    setStudent(updatedStudent); // 상태 업데이트
    setUpdateCount((prev) => prev + 1); // 수정 횟수 증가

    // API 요청으로 데이터 반영
    try {
      const response = await fetch(`https://67281ba1270bd0b9755468a5.mockapi.io/ossexample/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      if (!response.ok) throw new Error("Update failed");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <h2>Update Student</h2>
      <div className="alert alert-info">Total updates made: {updateCount}</div>
      <form>
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
            ref={genderRef}
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
        <Link to="/list" className="btn btn-secondary">
          Back to List
        </Link>
      </form>
    </div>
  );
};

export default StudentUpdate;
