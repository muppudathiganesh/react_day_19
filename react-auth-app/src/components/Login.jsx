import { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';  // To redirect after login

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/token/', { username, password });
      console.log('Access Token:', res.data.access);

      login(res.data.access);  // Store access token

      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Username"
        className="border p-2 w-full mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
    </form>
  );
}
