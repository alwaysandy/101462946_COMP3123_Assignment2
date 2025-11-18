import { useAuth } from "../hooks/useAuth";
import Button from "react-bootstrap/Button";

export default function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between px-3" style={{ backgroundColor: '#343a40' }}>
            <h2 style={{ color: '#dcdcdc' }}>Employee Management App</h2>
            {user ? (
                <Button variant="light" onClick={() => logout()}>Logout</Button>
            ) : null}
        </nav>
    );
}