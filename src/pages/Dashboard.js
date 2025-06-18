import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getStudents, getCourses } from '../utils/storage';

function Dashboard() {
  const [stats, setStats] = useState({
    studentCount: 0,
    courseCount: 0,
  });

  useEffect(() => {
    const students = getStudents();
    const courses = getCourses();
    setStats({
      studentCount: students.length,
      courseCount: courses.length,
    });
  }, []);

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Students</Card.Title>
              <Card.Text className="display-4">{stats.studentCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Courses</Card.Title>
              <Card.Text className="display-4">{stats.courseCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;