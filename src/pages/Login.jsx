import React, { useState } from 'react';

// Login component receives an onClose function as a prop.
function Login({ onClose }) {
    const [username, setUsername] = useState(''); // State for storing username
    const [password, setPassword] = useState(''); // State for storing password
    const [error, setError] = useState(''); // State for storing any error messages

    // Asynchronous function to handle the login process
    const handleLogin = async () => {
        try {
            // Make an HTTP POST request to your login endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password, // Sending plain password (make sure your connection is secure)
                }),
            });

            const data = await response.json(); // Parsing response to JSON

            if (response.ok) {
                // Successful login (HTTP 200)
                // Here you might want to do more things, like setting JWT tokens
                onClose(); // Close the login form/modal
            } else {
                // Failed login
                setError(data.message || 'Login failed.');
            }
        } catch (error) {
            // Catch any network errors and update the state
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {/* Display error messages if any */}
            {error && <p>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                // Update username state when input changes
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                // Update password state when input changes
                onChange={(e) => setPassword(e.target.value)}
            />
            {/* Trigger handleLogin function when button is clicked */}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;