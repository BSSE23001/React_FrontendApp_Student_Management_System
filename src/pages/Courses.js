import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { getCourses } from '../utils/storage';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const columns = [
    { key: 'code', header: 'Course Code' },
    { key: 'name', header: 'Course Name' },
    { key: 'instructor', header: 'Instructor' },
    { 
      key: 'students', 
      header: 'Enrolled Students',
      render: (course) => (
      <span className="badge bg-primary">
        {course.students ? course.students.length : 0}
      </span>
    )
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Courses</h1>
        <Link to="/courses/add">
          <Button variant="primary">Add Course</Button>
        </Link>
      </div>
      
      <DataTable
        data={courses}
        columns={columns}
      />
    </div>
  );
}

export default Courses;