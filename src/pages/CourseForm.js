import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Alert from '../components/Alert';
import { getCourseById, saveCourses, getCourses } from '../utils/storage';

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id: '',
    code: '',
    name: '',
    instructor: '',
    credits: 3
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (id) {
      const existingCourse = getCourseById(id);
      if (existingCourse) {
        setCourse(existingCourse);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!course.code) newErrors.code = 'Course code is required';
    if (!course.name) newErrors.name = 'Course name is required';
    if (!course.instructor) newErrors.instructor = 'Instructor is required';
    if (course.credits < 1 || course.credits > 5) newErrors.credits = 'Credits must be between 1-5';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const courses = getCourses();
    let updatedCourses;
    
    if (id) {
      updatedCourses = courses.map(c => c.id === id ? course : c);
    } else {
      updatedCourses = [...courses, { ...course, id: Date.now().toString(), students: [] }];
    }
    
    saveCourses(updatedCourses);
    setAlert({ message: `Course ${id ? 'updated' : 'added'} successfully`, variant: 'success' });
    setTimeout(() => navigate('/courses'), 2000);
  };

  return (
    <div>
      <h1 className="mb-4">{id ? 'Edit' : 'Add'} Course</h1>
      
      {alert && <Alert message={alert.message} variant={alert.variant} />}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Course Code"
          name="code"
          value={course.code}
          onChange={handleChange}
          error={errors.code}
        />
        <FormInput
          label="Course Name"
          name="name"
          value={course.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          label="Instructor"
          name="instructor"
          value={course.instructor}
          onChange={handleChange}
          error={errors.instructor}
        />
        <FormInput
          label="Credits"
          type="number"
          name="credits"
          min="1"
          max="5"
          value={course.credits}
          onChange={handleChange}
          error={errors.credits}
        />
        
        <button type="submit" className="btn btn-primary me-2">
          {id ? 'Update' : 'Save'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/courses')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CourseForm;