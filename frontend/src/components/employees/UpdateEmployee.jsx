import React, {useEffect, useState} from "react";
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import {useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";

const INITIAL_EMPLOYEE = {
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    date_of_joining: '',
    department: ''
}

export default function UpdateEmployee() {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [ employee, setEmployee ] = useState(INITIAL_EMPLOYEE);
    const [ error, setError ] = useState("");
    const getEmployeeDetails = async (employeeId) => {
        try {
            const employeeDetails = await EmployeeAPI.fetchEmployeeById(employeeId);

            setEmployee({
                ...employeeDetails,
                // Convert to usable format for Date input
                date_of_joining: new Date(employeeDetails.date_of_joining).toISOString().slice(0, 10)
            });
        } catch (error) {
            console.error("Failed to fetch employee details:", error);
            setError("Failed to fetch employee details.");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    }

    useEffect(() => {
        getEmployeeDetails(employeeId);
    }, [employeeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        await EmployeeAPI.updateEmployee(employeeId, employee)
            .then(res => {
                navigate("/");
            })
            .catch(err => {
                alert("Failed to update employee: " + err);
                setError("Failed to update employee. Please try again.");
            })
    }

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="text-center fw-bold fs-4">
                            Update Employee
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

                                <Button variant="warning" type="submit">
                                    Update Employee
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