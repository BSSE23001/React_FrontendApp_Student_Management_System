import { useState, useEffect } from 'react';
import { getStudents, getCourses, saveCourses } from '../utils/storage';
import DataTable from '../components/DataTable';
import Alert from '../components/Alert';

function Enrollment() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setStudents(getStudents());
    setCourses(getCourses());
  }, []);

  const handleEnroll = (studentId) => {
    if (!selectedCourse) {
      setAlert({ message: 'Please select a course first', variant: 'danger' });
      return;
    }

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse) {
        // Check if student is already enrolled
        if (!course.students.includes(studentId)) {
          return { ...course, students: [...course.students, studentId] };
        }
      }
      return course;
    });

    saveCourses(updatedCourses);
    setCourses(updatedCourses);
    setAlert({ message: 'Student enrolled successfully', variant: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleUnenroll = (studentId) => {
    if (!selectedCourse) {
      setAlert({ message: 'Please select a course first', variant: 'danger' });
      return;
    }

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse) {
        return { ...course, students: course.students.filter(id => id !== studentId) };
      }
      return course;
    });

    saveCourses(updatedCourses);
    setCourses(updatedCourses);
    setAlert({ message: 'Student unenrolled successfully', variant: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

  const enrolledStudents = selectedCourse 
    ? courses.find(c => c.id === selectedCourse)?.students || []
    : [];

  const studentColumns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (student) => (
        enrolledStudents.includes(student.id) ? (
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => handleUnenroll(student.id)}
          >
            Unenroll
          </button>
        ) : (
          <button 
            className="btn btn-success btn-sm"
            onClick={() => handleEnroll(student.id)}
          >
            Enroll
          </button>
        )
      )
    }
  ];

  return (
    <div>
      <h1 className="mb-4">Student Course Enrollment</h1>
      
      {alert && <Alert message={alert.message} variant={alert.variant} onClose={() => setAlert(null)} />}
      
      <div className="mb-4">
        <label htmlFor="courseSelect" className="form-label">Select Course:</label>
        <select
          id="courseSelect"
          className="form-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select a Course --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          <h3>Students</h3>
          <DataTable
            data={students}
            columns={studentColumns}
          />
        </>
      )}
    </div>
  );
}

export default Enrollment;