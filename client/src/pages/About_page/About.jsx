import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token  = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading user info…</div>;

  // **Extract the current user once here:**
  const userId = localStorage.getItem("userId");
  const currentUserArray = users.filter((u) => u._id === userId);
  const currentUser = currentUserArray.length > 0 ? currentUserArray[0] : null;

  if (!currentUser) {
    return <div>User not found.</div>;
  }










  // Now you can use currentUser.name, currentUser.email, currentUser.image, etc.
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Hello, {currentUser.name}</h2>
      <h2 className="text-2xl font-bold mb-2">Hello, {userId}</h2>
      <p className="text-gray-600 mb-1">Email: {currentUser.email}</p>
      
        <img
          src={currentUser.profilePicture}
          alt={currentUser.username}
          className="w-24 h-24 rounded-full mt-2"
        />
      
      {/* render any other fields */}
    </div>
  );
}
