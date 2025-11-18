import React, { useState } from "react";
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const INITIAL_EMPLOYEE = {
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    date_of_joining: '',
    department: ''
}

export default function AddEmployee() {
    const navigate = useNavigate();
    const [ employee, setEmployee ] = useState(INITIAL_EMPLOYEE);
    const [ error, setError ] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await EmployeeAPI.addEmployee(employee);
            navigate("/");
        } catch (err) {
            console.error("Error creating employee!", err);
            setError("Failed to create employee. Please try again.");
        }
    };

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="text-center fw-bold fs-4">
                            Add New Employee
                        </Card.Header>

                        <Card.Body className="p-4">
                            {error && (
                                <Alert variant="danger" onClose={() => setError("")} dismissible>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={employee.first_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={employee.last_name}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={employee.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter email"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="position">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="position"
                                        value={employee.position}
                                        onChange={handleInputChange}
                                        placeholder="Enter position"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="salary">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="salary"
                                        value={employee.salary}
                                        onChange={handleInputChange}
                                        placeholder="Enter salary"
                                        min="0"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="date_of_joining">
                                    <Form.Label>Date of Joining</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date_of_joining"
                                        value={employee.date_of_joining}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="department">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={employee.department}
                                        onChange={handleInputChange}
                                        placeholder="Enter department"
                                        required
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit">
                                    Add Employee
                                </Button>
                                <Button className="ms-2" variant="secondary" onClick={() => handleCancel()}>
                                    Cancel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
