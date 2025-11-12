import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EmployeeAPI from '../../api/employees/EmployeeAPI';

export default function ViewEmployee() {
    const { employeeId } = useParams();
    const [ employee, setEmployee ] = useState(null);
    const getEmployeeDetails = async (employeeId) => {
        try {
            const employeeDetails = await EmployeeAPI.fetchEmployeeById(employeeId);
            setEmployee(employeeDetails);
        } catch (error) {
            console.error("Failed to fetch employee details:", error);
        }
    }

    useEffect(() => {
        getEmployeeDetails(employeeId);
    }, [employeeId]);
    return (
        <div>
            <h2>View Employee Details</h2>
            <p>Employee ID: {employeeId}</p>
            {employee ? (
                <div>
                    <p>First Name: {employee.first_name}</p>
                    <p>Last Name: {employee.last_name}</p>
                    <p>Email: {employee.email}</p>
                    <p>Position: {employee.position}</p>
                    <p>Salary: {employee.salary}</p>
                    <p>Date of Joining: {employee.date_of_joining}</p>
                    <p>Department: {employee.department}</p>
                </div>
            ) : (
                <p>Loading employee details...</p>
            )}
        </div>
    );
}