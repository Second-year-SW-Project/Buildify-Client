import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = new URLSearchParams(window.location.search).get("token");
      console.log(token);
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/api/v1/users/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUser(data);
        toast.success("Successfully logged in using google");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
     
    };

    fetchUser();
  }, []);
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <h1>Welcome to Dashboard</h1>
      )}
      <div>
        <Button onClick={logout}>Log out</Button>
      </div>
    </div>
  );
};

export default Dashboard;



