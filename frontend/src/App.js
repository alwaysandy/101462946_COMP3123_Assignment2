import './App.css';
import EmployeeList from "./components/employees/EmployeeList";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import AddEmployee from "./components/employees/AddEmployee";

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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
