import React, { useState } from "react";
import UserAPI from "../../api/users/UserAPI";
import {Alert, Card, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const INITIAL_USER = {
    username: '',
    email: '',
    password: '',
}

export default function SignupUser() {
    const navigate = useNavigate();
    const [ user, setUser ] = useState(INITIAL_USER);
    const [errors, setErrors] = useState([]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.signupUser(user)
            .then(res => {
                navigate("/login");
            })
            .catch(err => {
                const errString = err.toString();
                const errorsArray = errString.replace("Error: ", "").split(",").map(e => e.trim());
                setErrors(errorsArray);
            })
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="text-center fw-bold fs-4">
                            Signup
                        </Card.Header>
                        <Card.Body className="p-4">
                            {errors.length > 0 && (
                                    errors.map(error => (
                                        <Alert variant="danger" onClose={() => setErrors([])} dismissible>
                                            {error}
                                        </Alert>
                                    ))
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">Signup</Button>
                                <Button className="mx-2" variant="secondary" onClick={() => navigate("/login")}>Cancel</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}