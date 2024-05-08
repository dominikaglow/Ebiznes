import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const Login = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            console.log(response.data);
            setStatus("Successfully logged in");
        } catch (error) {
            console.error("Error logging in: ", error);
            setStatus("Invalid username or password");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={Login}>Login</button>
            {status && <p>{status}</p>}
        </div>
    );
}

export default Login;
