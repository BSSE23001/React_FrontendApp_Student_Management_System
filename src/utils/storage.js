const STORAGE_KEY = 'studentManagementData';

export const loadData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { students: [], courses: [] };
};

export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getStudents = () => {
  return loadData().students;
};

export const saveStudents = (students) => {
  const data = loadData();
  data.students = students;
  saveData(data);
};

export const getStudentById = (id) => {
  return getStudents().find(student => student.id === id);
};

export const getCourses = () => {
  return loadData().courses;
};

export const saveCourses = (courses) => {
  const data = loadData();
  data.courses = courses;
  saveData(data);
};

// Add this function
export const getCourseById = (id) => {
  return getCourses().find(course => course.id === id);
};

// Update the sample data structure
const sampleData = {
  students: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      department: 'Computer Science'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      department: 'Electrical Engineering'
    }
  ],
  courses: [
    {
      id: '101',
      code: 'CS101',
      name: 'Introduction to Programming',
      instructor: 'Dr. Smith',
      credits: 3,
      students: ['1', '2'],
      grades: {
        '1': 'A',
        '2': 'B'
      }
    },
    {
      id: '102',
      code: 'EE201',
      name: 'Circuit Theory',
      instructor: 'Dr. Johnson',
      credits: 4,
      students: ['2'],
      grades: {
        '2': 'A'
      }
    }
  ]
};

localStorage.setItem('studentManagementData', JSON.stringify(sampleData));
console.log('Sample data initialized');