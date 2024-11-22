import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const StudentDetail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [student, setStudent] = useState(null);

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

  if (!student) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <h2>Student Detail</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{student.name}</h5>
          <p>Age: {student.age}</p>
          <p>Gender: {student.gender}</p>
          <p>Height: {student.height}</p>
          <p>Weight: {student.weight}</p>
          <Link to="/list" className="btn btn-secondary">
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
