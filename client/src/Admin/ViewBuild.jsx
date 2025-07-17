import React, { useState, useEffect } from "react";
import { InputField } from "../AtomicComponents/Inputs/Input";
import {
  PageSubtitle,
  PageTitle,
} from "../AtomicComponents/Typographics/TextStyles";
import theme from "../AtomicComponents/theme";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Chip, Box, Stack, Typography, Avatar } from "@mui/material";
import BuildItemCard from "../AtomicComponents/Cards/BuildItemCard";
import FullScreenLoader from "../AtomicComponents/FullScreenLoader";
import BuildStepper from "../MoleculesComponents/Admin_components/BuildStepper";
import { PrimaryButton } from "../AtomicComponents/Buttons/Buttons";
import { useNavigation } from "../MoleculesComponents/Admin_components/NavigationContext";

function ViewBuild() {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { selectedTab } = useNavigation();

  const [build, setBuild] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const StatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Building", label: "Building" },
    { value: "Completed", label: "Completed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Canceled", label: "Canceled" },
  ];

  const statusColorMap = {
    Pending: "warning",
    Confirmed: "primaryLight",
    Building: "primaryDark",
    Completed: "success",
    Shipped: "info",
    Delivered: "primary",
    Canceled: "error",
  };

  const deliveryMethodColorMap = {
    "Home Delivery": "primary",
    "Pick up at store": "info",
  };

  const getStepFromStatus = (status) => {
    switch (status) {
      case "Pending":
        return 1; // Start from step 1 (Build Confirmed) when order is pending
      case "Confirmed":
        return 2;
      case "Building":
        return 3;
      case "Completed":
        return 4;
      case "Shipped":
        return 5;
      case "Delivered":
        return 6;
      case "Canceled":
        return 1;
      default:
        return 1;
    }
  };

  // Fetch build details
  useEffect(() => {
    const fetchBuild = async () => {
      if (!id) {
        toast.error("No build ID provided");
        navigate("/adminpanel/orders/buildorderlist");
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching build:", id);
        const response = await axios.get(
          `${backendUrl}/api/build-transactions/builds/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data && response.data.success) {
          setBuild(response.data.data);
          // Set active step based on build status
          setActiveStep(getStepFromStatus(response.data.data.buildStatus));
        } else {
          toast.error("Failed to load Build");
          navigate("/adminpanel/orders/buildorderlist");
        }
      } catch (error) {
        console.error("Error fetching build:", error);
        toast.error("Failed to load build data");
        navigate("/adminpanel/orders/buildorderlist");
      } finally {
        setLoading(false);
      }
    };
    fetchBuild();
  }, [id, backendUrl, navigate]);

  // Handle status change from stepper
  const handleStepperStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const currentTime = new Date();

      // Determine the step based on status
      let newStep = getStepFromStatus(newStatus);
      let currentStep = getStepFromStatus(build.buildStatus);

      // Prepare timestamp updates
      const stepTimestamp = {
        [newStatus]: currentTime,
      };

      // If going back to a previous status, set the current status timestamp to null
      if (newStep < currentStep) {
        stepTimestamp[build.buildStatus] = null;
      }

      const response = await axios.patch(
        `${backendUrl}/api/build-transactions/${id}/status`,
        {
          buildStatus: newStatus,
          stepTimestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setBuild((prev) => ({ ...prev, buildStatus: newStatus }));
        setActiveStep(newStep);
        toast.success("Build status updated successfully");
      }
    } catch (error) {
      console.error("Error updating build status:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const currentTime = new Date();

      // Determine the step based on status
      let newStep = getStepFromStatus(newStatus);
      let currentStep = getStepFromStatus(build.buildStatus);

      // Prepare timestamp updates
      const stepTimestamp = {
        [newStatus]: currentTime,
      };

      // If going back to a previous status, set the current status timestamp to null
      if (newStep < currentStep) {
        stepTimestamp[build.buildStatus] = null;
      }

      // Update both status and timestamp
      const response = await axios.patch(
        `${backendUrl}/api/build-transactions/${id}/status`,
        {
          buildStatus: newStatus,
          stepTimestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data) {
        setBuild((prev) => ({ ...prev, buildStatus: newStatus }));
        setActiveStep(newStep);
        toast.success("Build status updated successfully");
      }
    } catch (error) {
      console.error("Error updating build status:", error);
      toast.error("Failed to update build status");
    } finally {
      setLoading(false);
    }
  };

  // Update the cancel button handler
  const handleCancel = () => {
    navigate("/adminpanel/orders/buildorderlist");
  };

  if (!build) {
    return <div>Build not found</div>;
  }

  return (
    <div className="pl-6 grid grid-rows">
      <FullScreenLoader open={loading} message={"Loading Data..."} />
      <div className="mt-3">
        <div className="flex items-center gap-2 ">
          <PageTitle
            value={`Build #${build._id?.slice(-4).toUpperCase() || "----"}`}
          />
          <Chip
            label={build.buildStatus}
            color={statusColorMap[build.buildStatus] || "default"}
            size="small"
            sx={{
              padding: "5px",
              height: "30px",
            }}
          />
        </div>
        <PageSubtitle
          value={
            new Date(build.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) +
            " " +
            new Date(build.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          }
          color={theme.palette.primary300.main}
        />
      </div>
      <div className="pb-4 mr-2">
        <div className="float-right mr-2">
          <InputField
            type="select"
            options={StatusOptions}
            value={build.buildStatus}
            onChange={(value) => handleStatusChange(value)}
            width="100%"
          />
        </div>
      </div>

      {/* Build Details */}
      <div className="mb-10 gap-4 w-full pr-4 flex items-start">
        <div className="w-2/3">
          <div className="buildDetails border-2 border-violet-600 rounded-lg p-4 mb-4">
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                Build Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Build Name: {build.buildName || "Custom Build"}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Build Type: {build.buildType || "Custom"}
                </Typography>
              </Box>
              {build.components?.map((component, i) => (
                <Stack
                  key={component._id || component.componentId || i}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  borderRadius={1}
                  border={1}
                  borderColor={theme.palette.black100.main}
                  width="100%"
                  mb={1}
                  p={1}
                  pr={0}
                >
                  <Box flex={3} display="flex" alignItems="center">
                    <BuildItemCard
                      name={component.name}
                      type={component.type?.toUpperCase()}
                      src={component.product_image}
                      componentId={component.componentId}
                      manufacturer={component.manufacturer}
                    />
                  </Box>
                  <Box
                    flex={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="flex-end"
                    textAlign="right"
                  >
                    <Typography>x {component.quantity || 1}</Typography>
                  </Box>
                  <Box
                    flex={1}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    textAlign="right"
                    marginRight={2}
                  >
                    <Typography variant="body1" fontWeight="bold" flex={1}>
                      {component.price ?
                        (component.price * (component.quantity || 1)).toLocaleString() :
                        "N/A"} LKR
                    </Typography>
                  </Box>
                </Stack>
              ))}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "right",
                  mr: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {/* Label column */}
                <Box sx={{ textAlign: "right", mr: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    Total Price:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    Service Charge:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    Delivery:
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    Net Total:
                  </Typography>
                </Box>

                {/* Value column */}
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {(build.TotalPrice - (build.serviceCharge || 0) - (build.deliveryCharge || 0))?.toLocaleString() || 0} LKR
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="info"
                    sx={{ mb: 1 }}
                  >
                    + {build.serviceCharge?.toLocaleString() || 0} LKR
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="warning"
                    sx={{ mb: 1 }}
                  >
                    + {build.deliveryCharge?.toLocaleString() || 0} LKR
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {build.TotalPrice?.toLocaleString() || 0} LKR
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
          <div className="buildTracking border-2 border-violet-600 rounded-lg p-4 mt-4 bg-purple-100">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Build Tracking
            </Typography>
            <BuildStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              buildId={build._id}
              onStatusChange={handleStepperStatusChange}
              buildStatus={build.buildStatus}
              editable={true}
            />
            {build.buildStatus === "Canceled" && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                >
                  Build Canceled
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {build.stepTimestamps?.Canceled ? (
                    <>
                      This build has been Canceled on{" "}
                      {new Date(
                        build.stepTimestamps.Canceled
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(
                        build.stepTimestamps.Canceled
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    "This build has been Canceled"
                  )}
                </Typography>
              </Box>
            )}
            {build.buildStatus === "Delivered" && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  color="success"
                  sx={{ fontWeight: "bold" }}
                >
                  Build Delivered Successfully
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {build.stepTimestamps?.Delivered ? (
                    <>
                      This build has been Delivered on{" "}
                      {new Date(
                        build.stepTimestamps.Delivered
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(
                        build.stepTimestamps.Delivered
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </>
                  ) : (
                    "This build has been Delivered"
                  )}
                </Typography>
              </Box>
            )}
          </div>
        </div>
        <div className="w-1/3">
          <div className="userDetails border-2 border-violet-600 rounded-lg p-4">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Customer
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Avatar
                  src={build.profilePicture || "../../client/public/logo.png"}
                  alt={build.userName}
                  sx={{ width: 50, height: 50, flexShrink: 0 }}
                />
                <Box
                  sx={{
                    flex: 1,
                    wordBreak: "break-word",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ wordBreak: "break-word", fontWeight: "bold" }}
                  >
                    {build.userName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {build.userEmail}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
              Shipping
            </Typography>
            <Box
              sx={{
                mt: 2,
                textAlign: "left",
                mr: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {/* Conditionally display Address and District only for Home Delivery */}
              {(build.deliveryMethod === "Home Delivery") && (
                <>
                  {/* Address Row */}
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="gray"
                      sx={{ minWidth: "80px" }}
                    >
                      Address
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                    >
                      :{build.userAddress || "N/A"}
                    </Typography>
                  </Box>

                  {/* District Row */}
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="gray"
                      sx={{ minWidth: "80px" }}
                    >
                      District
                    </Typography>
                    <Typography variant="body1">
                      :{build.district || "N/A"}
                    </Typography>
                  </Box>
                </>
              )}

              {/* Delivery Method Row - Always displayed */}
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="gray"
                  sx={{ minWidth: "80px" }}
                >
                  Method :
                </Typography>
                <Box sx={{ ml: 0 }}>
                  <Chip
                    label={
                      build.deliveryMethod === "Home Delivery"
                        ? "By Delivery"
                        : build.deliveryMethod === "Pick up at store"
                          ? "By Store"
                          : build.deliveryMethod || "N/A"
                    }
                    color={deliveryMethodColorMap[build.deliveryMethod] || "default"}
                    size="small"
                    sx={{
                      height: "24px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
              Payment
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="gray"
                sx={{ minWidth: "80px" }}
              >
                Method :
              </Typography>
              <Typography variant="body1">
                {build.paymentMethod || "Stripe"}
              </Typography>
            </Box>
          </div>
        </div>
      </div>
      <div className="pb-6 pr-4">
        <div className="float-right flex flex-row gap-x-2">
          <PrimaryButton
            fontSize="16px"
            name="Save Build"
            buttonSize="medium"
            isBold={1}
            color="primary"
            padding="40px"
            type="button"
            onClick={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewBuild;
