import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import FormInput from '../components/FormInput';
import Alert from '../components/Alert';
import { getStudentById, saveStudents, getStudents } from '../utils/storage';
import { validateStudentForm } from '../utils/validators';

function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (id) {
      const existingStudent = getStudentById(id);
      if (existingStudent) {
        setStudent(existingStudent);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateStudentForm(student);
    setErrors(validationErrors);
    
    if (!isValid) return;

    const students = getStudents();
    let updatedStudents;
    
    if (id) {
      updatedStudents = students.map(s => s.id === id ? student : s);
    } else {
      updatedStudents = [...students, { ...student, id: Date.now().toString() }];
    }
    
    saveStudents(updatedStudents);
    setAlert({ message: `Student ${id ? 'updated' : 'added'} successfully`, variant: 'success' });
    setTimeout(() => navigate('/students'), 2000);
  };

  return (
    <div>
      <h1 className="mb-4">{id ? 'Edit' : 'Add'} Student</h1>
      
      {alert && <Alert message={alert.message} variant={alert.variant} />}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          name="name"
          value={student.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label="Phone"
          name="phone"
          value={student.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormInput
          label="Department"
          name="department"
          value={student.department}
          onChange={handleChange}
          error={errors.department}
        />
        
        <Button type="submit" variant="primary" className="me-2">
          {id ? 'Update' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/students')}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default StudentForm;