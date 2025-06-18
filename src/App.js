import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentForm from './pages/StudentForm';
import Courses from './pages/Courses';
import CourseForm from './pages/CourseForm';
import Enrollment from './pages/Enrollment';
import GradeManagement from './pages/GradeManagement';
import NotFound from './pages/NotFound';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<StudentForm />} />
          <Route path="/students/edit/:id" element={<StudentForm />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/add" element={<CourseForm />} />
          <Route path="/courses/edit/:id" element={<CourseForm />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/grades" element={<GradeManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;