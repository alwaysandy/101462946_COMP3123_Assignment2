import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function ViewEmployee() {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [ employee, setEmployee ] = useState(null);
    const [ error, setError ] = useState("");
    const getEmployeeDetails = async (employeeId) => {
        try {
            const employeeDetails = await EmployeeAPI.fetchEmployeeById(employeeId);
            setEmployee(employeeDetails);
        } catch (error) {
            console.error("Failed to fetch employee details:", error);
            setError("Failed to fetch employee details.");
        }
    }

    const handleBack = () => {
        navigate("/");
    }

    useEffect(() => {
        getEmployeeDetails(employeeId);
    }, [employeeId]);

    return (
        <div>
        {employee ? (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="text-center fw-bold fs-4">
                            Employee Details
                        </Card.Header>
                        <Card.Body className="p-4">
                            <p>Employee ID: {employeeId}</p>
                            <p>First Name: {employee.first_name}</p>
                            <p>Last Name: {employee.last_name}</p>
                            <p>Email: {employee.email}</p>
                            <p>Position: {employee.position}</p>
                            <p>Salary: {employee.salary}</p>
                            <p>Date of Joining: {employee.date_of_joining}</p>
                            <p>Department: {employee.department}</p>
                            <Button variant="secondary" onClick={() => handleBack()}>Back</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        ) : (
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Header className="text-center fw-bold fs-4">
                                Employee Details
                            </Card.Header>
                            <Card.Body className="p-4">
                                {error && (
                                    <Alert variant="danger" onClose={() => setError("")} dismissible>
                                        {error}
                                    </Alert>
                                )}
                                <p>Employee ID: {employeeId}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )}
        </div>
    );
}