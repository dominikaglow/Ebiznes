import React, { useEffect } from 'react';

function Login() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login';
    }

    return (
        <div>
            <h2>Login</h2>
            {isLoggedIn ? (
                <div>
                    <p>Logged in</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login with Google</button>
            )}
        </div>
    );
}

export default Login;
