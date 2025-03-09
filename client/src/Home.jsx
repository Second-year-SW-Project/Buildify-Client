import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Fixed import
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from './store/authSlice';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Corrected this
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);

      // Save user details in Redux store
      dispatch(setAuthUser({ name, email, token }));

      // Remove token from URL
      navigate('/', { replace: true });
    }
  }, [location, navigate, dispatch]);

  const logoutHandler = async () => {
    await axios.post('http://localhost:8000/api/v1/users/logout');
    dispatch(setAuthUser(null));
    toast.success('Logout successfully');
  };

  const handleComplaint = () => {
    navigate('/auth/complaintsubmit');
  };

  return (
    <div>
      <Toaster />
      <div>
        <h1>Logo</h1>
        {!user && (
          <Link to="/auth/signup">
            <Button variant="contained">Register</Button>
          </Link>
        )}

        {user && (
          <div>
            <Button>Dashboard {user.name}</Button>
            <Button onClick={logoutHandler}>Logout</Button>
            <Button>{user.isVerified ? 'Verified' : 'Not verified'}</Button>
          </div>
        )}

        {user && (
          <div>
            <Button onClick={handleComplaint}>Complaint</Button>
          </div>
        )}
      </div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
