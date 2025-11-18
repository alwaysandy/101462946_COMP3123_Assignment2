import './App.css';
import EmployeeList from "./components/employees/EmployeeList";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import AddEmployee from "./components/employees/AddEmployee";
import ViewEmployee from "./components/employees/ViewEmployee";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import SignupUser from "./components/users/SignupUser";
import NavBar from "./components/NavBar";
import LoginUser from "./components/users/LoginUser";
import {useAuth, AuthProvider} from "./hooks/useAuth";
import {ProtectedRoute} from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
                <EmployeeList />
            </ProtectedRoute>
        } />
        <Route path="/add-employee" element={
            <ProtectedRoute>
                <AddEmployee />
            </ProtectedRoute>
        } />
        <Route path="/view-employee/:employeeId" element={
            <ProtectedRoute>
                <ViewEmployee />
            </ProtectedRoute>
        } />
        <Route path="/update-employee/:employeeId" element={
            <ProtectedRoute>
                <UpdateEmployee />
            </ProtectedRoute>
        } />
        <Route path="/signup" element={<SignupUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
