import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleRegister = async () => {
        try {

            console.log('Username:', username);
            console.log('Password:', password);

            const response = await axios.post('http://localhost:3000/register', {
                username,
                password
            });
            setStatus("User created");
        } catch (error) {
            setStatus("Error creating user or the user already exists");
        }
    };

    return (
        <div className="Register">
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            {status && <p>{status}</p>}
        </div>
    );
}

export default Register;