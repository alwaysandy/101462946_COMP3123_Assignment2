import React, { useState, useEffect } from 'react';
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import { useNavigate } from 'react-router-dom';

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
            <table border="1" cellPadding="5">
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Join Date</th>
                    <th>Department</th>
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
                            <button onClick={ e => viewEmployee(employee._id)}>View</button>
                            <button onClick={ e => updateEmployee(employee._id)}>Update</button>
                            <button onClick={ e => deleteEmployee(employee._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}