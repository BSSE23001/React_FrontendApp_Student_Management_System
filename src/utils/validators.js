export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateStudentForm = (student) => {
  const errors = {};
  
  if (!student.name) errors.name = 'Name is required';
  if (!student.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(student.email)) {
    errors.email = 'Invalid email format';
  }
  if (!student.phone) errors.phone = 'Phone is required';
  if (!student.department) errors.department = 'Department is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};