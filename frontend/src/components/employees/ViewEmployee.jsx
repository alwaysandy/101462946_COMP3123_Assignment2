import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EmployeeAPI from '../employees/EmployeeAPI';

export default function ViewEmployee() {
    const { employeeId } = useParams();
}