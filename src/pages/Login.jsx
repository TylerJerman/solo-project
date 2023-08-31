import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './reduxStore.js';

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = async () => {
      console.log(username, password);
    const user = {username: username, password: password}
    const {data} = await axios.post('http://localhost:5173/api/login', user)
    setLoggedIn(true)
    // try {
    //   const response = await axios.post('/api/login', user);
    //   if (response.data.success) {
    //     dispatch(login(response.data.user));
    //   } else {
    //     setError(response.data.message || 'Login failed.');
    //   }
    // } catch (error) {
    //   setError('An error occurred. Please try again.');
    // }
  };

  return (
    <>
    
    { !loggedIn &&
            <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        </div>
    }

    </>
  );
}

export default Login;