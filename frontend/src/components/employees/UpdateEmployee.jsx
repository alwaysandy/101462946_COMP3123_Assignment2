import React, {useEffect, useState} from "react";
import EmployeeAPI from '../../api/employees/EmployeeAPI';
import {useNavigate, useParams} from "react-router-dom";

const INITIAL_EMPLOYEE = {
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: 0,
    date_of_joining: new Date(),
    department: ''
}

export default function UpdateEmployee() {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [ employee, setEmployee ] = useState(INITIAL_EMPLOYEE);
    const getEmployeeDetails = async (employeeId) => {
        try {
            const employeeDetails = await EmployeeAPI.fetchEmployeeById(employeeId);
            setEmployee(employeeDetails);
        } catch (error) {
            console.error("Failed to fetch employee details:", error);
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
    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeAPI.updateEmployee(employeeId, employee)
            .then(res => {
                navigate("/");
            })
            .catch(err => {
                alert("Failed to update employee: " + err);
            })
    }

    return (
        <div>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="first_name" value={employee.first_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Last Name: </label>
                    <input type="text" name="last_name" value={employee.last_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="text" name="email" value={employee.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Position: </label>
                    <input type="text" name="position" value={employee.position} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Salary: </label>
                    <input type="number" name="salary" value={employee.salary} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Date of Joining: </label>
                    <input type="date" name="date_of_joining" value={employee.date_of_joining} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Department: </label>
                    <input type="text" name="department" value={employee.department} onChange={handleInputChange}/>
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}