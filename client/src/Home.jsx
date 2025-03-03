import React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAuthUser } from './store/authSlice';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await axios.post('http://localhost:8000/api/v1/users/logout');
    dispatch(setAuthUser(null));
    toast.success('Logout successfully');
  };

  // Fixed function definition
  const handleComplaint = () => {
    navigate('/auth/complaintsubmit');
  };

  return (
    <div>
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
