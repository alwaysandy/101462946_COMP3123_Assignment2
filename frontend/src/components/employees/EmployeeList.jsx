import React, { useState, useEffect } from 'react';
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const fetchEmployees = async () => {
        try {
            const employeeList = await EmployeeAPI.fetchEmployees();
            setEmployees(employeeList);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, [])

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

    return (
        <div>
            <h3>Employee List</h3>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Join Date</th>
                    <th>Department</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees.map(employee => (
                    <tr key={employee._id}>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.position}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.date_of_joining}</td>
                        <td>{employee.department}</td>
                        <td>
                            <Button variant="info" onClick={ e => viewEmployee(employee._id)}>View</Button>
                            <Button variant="warning" onClick={ e => updateEmployee(employee._id)}>Update</Button>
                            <Button variant="danger" onClick={ e => deleteEmployee(employee._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}