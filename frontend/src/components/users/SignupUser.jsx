import React, { useState } from "react";
import UserAPI from "../../api/users/UserAPI";

const INITIAL_USER = {
    username: '',
    email: '',
    password: '',
}

export default function SignupUser() {
    const [ user, setUser ] = useState(INITIAL_USER);
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
                setUser(INITIAL_USER);
            })
            .catch(err => {
                console.error("Error signing up user!", err);
            })
    }

    return (
        <div>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" value={user.username} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="text" name="email" value={user.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password" value={user.password} onChange={handleInputChange}/>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}