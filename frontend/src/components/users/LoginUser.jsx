import React, { useState } from "react";
import UserAPI from "../../api/users/UserAPI";
import { useAuth } from "../../hooks/useAuth";

const INITIAL_USER = {
    username: '',
    password: '',
}

export default function LoginUser() {
    const { login } = useAuth();
    const [ user, setUser ] = useState(INITIAL_USER);
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
            })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={user.username} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={user.password} onChange={handleInputChange}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}