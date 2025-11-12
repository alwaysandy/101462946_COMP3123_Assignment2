import './App.css';
import EmployeeList from "./components/employees/EmployeeList";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>Employee Testing</h1>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
