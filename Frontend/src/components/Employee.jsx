import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Employee = () => {
  const [view, setView] = useState("list"); // "list" or "add"
  const [employees, setEmployees] = useState([
    {
      id: 5028,
      name: "Kristin Watson",
      position: "Medical Assistant",
      type: "Full-Time",
      status: "Present",
      checkIn: "08:34 am",
      checkOut: "05:45 pm",
      overtime: "0hr 45min",
    },
    {
      id: 7791,
      name: "Bessie Cooper",
      position: "Nursing Assistant",
      type: "Part-Time",
      status: "Absent",
      checkIn: "-",
      checkOut: "-",
      overtime: "-",
    },
    {
      id: 3933,
      name: "Annette Black",
      position: "Dog Trainer",
      type: "Part-Time",
      status: "Present",
      checkIn: "09:23 am",
      checkOut: "05:00 pm",
      overtime: "0hr",
    },
    {
      id: 8829,
      name: "Eleanor Pena",
      position: "President of Sales",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:27 am",
      checkOut: "06:06 pm",
      overtime: "1h 06min",
    },
    {
      id: 4600,
      name: "Jenny Wilson",
      position: "Marketing Coordinator",
      type: "Full-Time",
      status: "Present",
      checkIn: "09:32 am",
      checkOut: "05:18 pm",
      overtime: "0hr 18min",
    },
    {
      id: 8811,
      name: "Devon Lane",
      position: "Web Designer",
      type: "Full-Time",
      status: "Late",
      checkIn: "10:41 am",
      checkOut: "07:12 pm",
      overtime: "2hr 12min",
    },
  ]);

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    role: "",
    department: "",
    id: "",
    type: "",
    phone: "",
    email: "",
  });

  const handleFormChange = (e) => {
    setEmployeeForm({ ...employeeForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEmp = {
      id: employeeForm.id,
      name: employeeForm.name,
      position: employeeForm.role,
      type: employeeForm.type,
      status: "Pending",
      checkIn: "-",
      checkOut: "-",
      overtime: "-",
    };
    setEmployees([...employees, newEmp]);
    setEmployeeForm({
      name: "",
      role: "",
      department: "",
      id: "",
      type: "",
      phone: "",
      email: "",
    });
    setView("list");
  };

  return (
    <div style={{ backgroundColor: "#1d1f73", minHeight: "100vh", color: "white", padding: "20px" }}>
      <div style={{ backgroundColor: "#2c2f69", borderRadius: "8px", padding: "20px" }}>
        <div className="mb-4">
          <Button variant="light" onClick={() => setView("list")} className="me-2">📋 View Employees</Button>
          <Button variant="outline-light" onClick={() => setView("add")}>➕ Add Employee</Button>
        </div>

        {view === "list" ? (
          <>
            <div className="row align-items-center mb-4">
              <div className="col-md-3"><button className="btn btn-outline-light w-100">22 Nov. 2024</button></div>
              <div className="col-md-3"><Form.Control placeholder="Search" className="bg-transparent text-white" /></div>
              <div className="col-md-3"><Form.Select className="bg-transparent text-white"><option>All Departments</option></Form.Select></div>
              <div className="col-md-3 text-end"><button className="btn btn-outline-light">Export CSV ⬇</button></div>
            </div>

            <Table hover responsive className="table-borderless text-white align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Position</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Overtime</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td className="d-flex align-items-center">
                      <img src={`https://i.pravatar.cc/30?img=${i + 1}`} className="rounded-circle me-2" alt="avatar" />
                      {emp.name}
                    </td>
                    <td>{emp.position}</td>
                    <td><Badge bg="dark" className="py-1 px-2 rounded-pill">{emp.type}</Badge></td>
                    <td><Badge bg={emp.status === "Present" ? "success" : emp.status === "Absent" ? "danger" : "warning"} className="py-1 px-2 rounded-pill">{emp.status}</Badge></td>
                    <td>{emp.checkIn}</td>
                    <td>{emp.checkOut}</td>
                    <td>{emp.overtime}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <h4 className="mb-3">Add New Employee</h4>
            <Alert variant="light" className="border text-dark">
              <strong>Preparing a CSV file?</strong><br />
              Great news! If you have already generated a CSV file in the <a href="/">recommended format</a>, you can use our bulk import feature!
              <Button variant="primary" size="sm" className="float-end mt-2"><i className="bi bi-upload"></i> Import List</Button>
            </Alert>

            <Form onSubmit={handleFormSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group controlId="employeeName">
                    <Form.Label>Employee Name</Form.Label>
                    <Form.Control type="text" name="name" value={employeeForm.name} onChange={handleFormChange} placeholder="Enter employee name" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" name="phone" value={employeeForm.phone} onChange={handleFormChange} placeholder="+91 123 456 7890" />
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name="role" value={employeeForm.role} onChange={handleFormChange}>
                      <option value="">Select role</option>
                      <option>Chartered Accountant</option>
                      <option>Developer</option>
                      <option>HR Manager</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={employeeForm.email} onChange={handleFormChange} placeholder="example@email.com" />
                    <Form.Text className="text-muted">*The above email will be used to send invite to the employee</Form.Text>
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group controlId="department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control type="text" name="department" value={employeeForm.department} onChange={handleFormChange} placeholder="e.g., Technical Support" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="employeeId">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control type="text" name="id" value={employeeForm.id} onChange={handleFormChange} placeholder="ID number" />
                  </Form.Group>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Select name="type" value={employeeForm.type} onChange={handleFormChange}>
                      <option value="">Select Type</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>
              <Button variant="primary" type="submit">Save Employee Details</Button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Employee;
