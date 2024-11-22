import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://67281ba1270bd0b9755468a5.mockapi.io/ossexample");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`https://67281ba1270bd0b9755468a5.mockapi.io/ossexample/${studentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted student from the local state
          setStudents(students.filter(student => student.id !== studentId));
          alert("Student deleted successfully");
        } else {
          throw new Error('Delete failed');
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student");
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Student Data Management</h1>
      <Link to="/create" className="btn btn-primary mb-3">
        Create Student
      </Link>
      <div>
        {students.map((student) => (
          <div className="card mb-3" key={student.id}>
            <div className="card-body">
              <h5 className="card-title">{student.name}</h5>
              <p>Age: {student.age}</p>
              <p>Gender: {student.gender}</p>
              <Link to={`/detail?id=${student.id}`} className="btn btn-info btn-sm me-2">
                Detail
              </Link>
              <Link to={`/update?id=${student.id}`} className="btn btn-primary btn-sm me-2">
                Update
              </Link>
              <button 
                onClick={() => handleDelete(student.id)} 
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;