import { useState, useEffect } from 'react';
import { getStudents, getCourses, saveCourses } from '../utils/storage';
import Alert from '../components/Alert';

function GradeManagement() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [grades, setGrades] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setStudents(getStudents());
    setCourses(getCourses());
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      const course = courses.find(c => c.id === selectedCourse);
      setGrades(course?.grades || {});
    }
  }, [selectedCourse, courses]);

  const handleGradeChange = (studentId, grade) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: grade
    }));
  };

  const saveGrades = () => {
    if (!selectedCourse) {
      setAlert({ message: 'Please select a course first', variant: 'danger' });
      return;
    }

    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse) {
        return { ...course, grades };
      }
      return course;
    });

    saveCourses(updatedCourses);
    setCourses(updatedCourses);
    setAlert({ message: 'Grades saved successfully', variant: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

  const enrolledStudents = selectedCourse 
    ? students.filter(student => 
        courses.find(c => c.id === selectedCourse)?.students?.includes(student.id))
    : [];

  return (
    <div>
      <h1 className="mb-4">Grade Management</h1>
      
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
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {enrolledStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>
                      <select
                        className="form-select"
                        value={grades[student.id] || ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                      >
                        <option value="">-- Select Grade --</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={saveGrades}
            disabled={enrolledStudents.length === 0}
          >
            Save Grades
          </button>
        </>
      )}
    </div>
  );
}

export default GradeManagement;