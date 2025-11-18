import React, { useState, useEffect } from 'react';
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Col, Form, InputGroup, Stack} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const fetchEmployees = async () => {
        try {
            const employeeList = await EmployeeAPI.fetchEmployees();
            setEmployees(employeeList);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    }

    const handleInputChange = e => {
        const search = e.currentTarget.value;
        setSearch(search);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const employeeList = await EmployeeAPI.fetchFilteredEmployees(search);
            setEmployees(employeeList);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    };

    const addEmployee = () => {
        navigate('/add-employee');
    }

    const viewEmployee = (employeeId) => {
        navigate(`/view-employee/${employeeId}`);
    }

    const updateEmployee = (employeeId) => {
        navigate(`/update-employee/${employeeId}`);
    }

    const deleteEmployee = async (employeeId) => {
        try {
            await EmployeeAPI.deleteEmployee(employeeId);
            fetchEmployees();
        } catch (error) {
            console.error('Failed to delete employee', error);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, [])

    return (
        <Container fluid className="mt-4">
            <Row>
                <h1 className="text-md-center">Employees List</h1>
            </Row>
            <Row className="mb-3">
                <Col xs="auto">
                    <Button variant="primary" onClick={() => addEmployee()}>Add Employee</Button>
                </Col>
                <Col></Col>
                <Col xs="auto">
                    <Form onSubmit={handleSearch}>
                        <InputGroup>
                        <Form.Control
                            type="text"
                            name="search"
                            value={search}
                            onChange={handleInputChange}
                            placeholder="Search"
                        />
                        <Button variant="outline-secondary" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Employee Position</th>
                        <th>Employee Department</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>
                                <Stack direction="horizontal" gap={2}>
                                    <Button variant="info" onClick={ e => viewEmployee(employee._id)}>View</Button>
                                    <Button variant="warning" onClick={ e => updateEmployee(employee._id)}>Update</Button>
                                    <Button variant="danger" onClick={ e => deleteEmployee(employee._id)}>Delete</Button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </Container>
    )
}