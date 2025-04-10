import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import SideNav from "../SideNav";
import { Divider, Paper, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { InputField } from "../../AtomicComponents/Inputs/Input";
import { OutlinedButton } from "../../AtomicComponents/Buttons/Buttons";
import Navbar from "../../MoleculesComponents/User_navbar_and_footer/Navbar";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "../../Store/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEnabled, SetIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        dispatch(setAuthUser(response.data));
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      }
    };
    fetchUserProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch(setAuthUser(response.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  const handleToggle = () => {
    SetIsEnabled(!isEnabled);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="flex flex-1">
          <SideNav />

          <main className="flex-1 mt-36 p-6 pl-64">
            <Box>
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <Box
                  component={"main"}
                  sx={{
                    p: 3,
                    pl: 7,
                    width: "90%",
                    boxShadow: 1,
                    borderRadius: 2,
                  }}
                >
                  <h1 className="text-3xl font-bold mt-5 mb-6">Profile</h1>
                  <Divider></Divider>
                  <Box sx={{ pt: 3 }}>
                    <AccountCircleIcon
                      sx={{ fontSize: 50 }}
                      color="primary"
                    ></AccountCircleIcon>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col md:flex-row mt-5">
                        <div className="flex-1 mb-5 mr-1">
                          <InputField
                            type="text"
                            variant="outlined"
                            label="User Name"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            width="70%"
                            outlinedActive
                          />
                        </div>
                        <div className="flex-1 mb-5">
                          <InputField
                            type="text"
                            variant="outlined"
                            label="First Name"
                            name="firstName"
                            value={formData.firstName || ""}
                            onChange={handleChange}
                            width="70%"
                            outlinedActive
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 mb-5 mr-1">
                          <InputField
                            type="text"
                            variant="outlined"
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName || ""}
                            onChange={handleChange}
                            width="70%"
                            outlinedActive
                          />
                        </div>
                        <div className="flex-1 mb-5">
                          <InputField
                            type="text"
                            variant="outlined"
                            label="Email Address"
                            name="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            width="70%"
                            outlinedActive
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex-1 mb-5 mr-1">
                          <InputField
                            type="text"
                            variant="outlined"
                            label="Address"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            width="86%"
                            rows={3}
                            outlinedActive
                          />
                        </div>
                      </div>
                      <div>
                        <Paper elevation={3} sx={{ padding: 3, width: "86%" }}>
                          <h2 className="text-2xl font-semibold text-gray-600">
                            Two Factor Authentication(2FA)
                          </h2>
                          <p className="text-gray-600 mt-2">
                            Status: {isEnabled ? "Enabled" : "Disabled"}
                          </p>
                          <OutlinedButton
                            name={isEnabled ? "Disable" : "Enable"}
                            onClick={handleToggle}
                          ></OutlinedButton>
                        </Paper>
                      </div>

                      <InputField
                        type="checkbox"
                        label="Sign up for emails to get updates"
                      ></InputField>
                      <p className="text-purple-600 font-medium">
                        Change password
                      </p>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </Box>
                </Box>
              </Box>
            </Box>
          </main>
        </div>
      </div>
    </div>
  );
}
