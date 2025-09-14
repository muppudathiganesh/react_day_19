import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';  // For redirect after logout

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setMessage('No auth token available');
      return;
    }

    console.log('Using token:', token);

    api.get('/api/protected/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessage(res.data.message))
    .catch(err => {
      console.error('Protected API error:', err.response ? err.response.data : err.message);
      setMessage('Failed to fetch data');
    });
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>{message}</p>
      <button className="mt-4 bg-red-500 text-white p-2 rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
