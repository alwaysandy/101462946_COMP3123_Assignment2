import React, { useState } from "react";
import UserAPI from "../../api/users/UserAPI";
import { useAuth } from "../../hooks/useAuth";
import {Alert, Card, Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const INITIAL_USER = {
    username: '',
    password: '',
}

export default function LoginUser() {
    const { login } = useAuth();
    const [ user, setUser ] = useState(INITIAL_USER);
    const [error, setError] = useState("");
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UserAPI.loginUser(user)
            .then(async res => {
                await login(res);
                setUser(INITIAL_USER);
            })
            .catch(err => {
                console.error("Error logging in user!", err);
                setError("Error logging in, invalid username or password");
            })
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="text-center fw-bold fs-4">
                            Login
                        </Card.Header>
                        <Card.Body className="p-4">
                            {error && (
                                <Alert variant="danger" onClose={() => setError("")} dismissible>
                                    {error}
                                </Alert>
                            )}
                            <Form className="mb-3" onSubmit={handleSubmit}>
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
                                <Button variant="primary" type="submit">Login</Button>
                            </Form>
                            <Link to="/signup">Don't have an account? Signup here</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}