import './App.css';
import EmployeeList from "./components/employees/EmployeeList";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import AddEmployee from "./components/employees/AddEmployee";
import ViewEmployee from "./components/employees/ViewEmployee";
import UpdateEmployee from "./components/employees/UpdateEmployee";

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>Employee Testing</h1>
          <nav>
              <NavLink to="/">Employees</NavLink>
              <NavLink to="/add-employee">Add Employee</NavLink>
          </nav>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/view-employee/:employeeId" element={<ViewEmployee />} />
        <Route path="/update-employee/:employeeId" element={<UpdateEmployee />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
