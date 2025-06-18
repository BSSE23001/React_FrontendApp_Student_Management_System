import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Alert from '../components/Alert';
import { getStudents, saveStudents } from '../utils/storage';

function Students() {
  const [students, setStudents] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    saveStudents(updatedStudents);
    setStudents(updatedStudents);
    setAlert({ message: 'Student deleted successfully', variant: 'success' });
    setTimeout(() => setAlert(null), 3000);
  };

const columns = [
    { 
      key: 'name', 
      header: 'Name',
      filterable: true
    },
    { 
      key: 'email', 
      header: 'Email',
      filterable: true
    },
    { 
      key: 'phone', 
      header: 'Phone' 
    },
    { 
      key: 'department', 
      header: 'Department',
      filterable: true
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Students</h1>
        <Link to="/students/add">
          <Button variant="primary">Add Student</Button>
        </Link>
      </div>
      
      {alert && <Alert message={alert.message} variant={alert.variant} onClose={() => setAlert(null)} />}
      

      <DataTable
        data={students}
        columns={columns}
        onDelete={handleDelete}
        onEdit={true}
        searchable={true}
        filterable={true}
      />
    </div>
  );
}

export default Students;