import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import React from 'react';

const Admindashboard = () => {
  const navigate = useNavigate(); // Correct use of the hook

  const handlec = () => {
    navigate('/auth/admincomplaint'); // Correct use of navigate
  };
  const handleuser = () =>{
    navigate('/auth/usermanage');
  }
  const handleback = () =>{
    navigate('/');
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Button>Profile</Button>
          </li>
          <li>
            <Button onClick={handleuser}>User management</Button>
          </li>
          <li>
            <Button onClick={handlec}>Handle Complaints</Button> {/* Corrected the event handler */}
          </li>
          <li>
            <Button onClick={handleback}>Back</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admindashboard;
