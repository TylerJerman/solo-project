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