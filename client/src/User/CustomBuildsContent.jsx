import { useState, useEffect } from "react";
import PCBuildCard from "../AtomicComponents/Cards/PCBuildCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import BuildDetailsPopup from "../AtomicComponents/Cards/BuildDetailsPopup";
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";

export default function CustomBuildsContent() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuild, setSelectedBuild] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buildToDelete, setBuildToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchUserBuilds = async () => {
      if (!user || !user._id) {
        console.log("No user or user ID found:", user);
        setLoading(false);
        return;
      }

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication required");
        }

        console.log("Fetching builds for user:", user._id);
        const response = await axios.get(
          `${backendUrl}/api/build/builds/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("Builds fetched successfully:", response.data.builds);
          setBuilds(response.data.builds);
        } else {
          throw new Error(response.data.message || "Failed to fetch builds");
        }
      } catch (error) {
        console.error(
          "Error fetching builds:",
          error.response?.data || error.message
        );

        if (
          error.response?.status === 401 ||
          error.message.includes("Authentication required")
        ) {
          toast.error("Please login to view your builds", {
            duration: 3000,
            style: {
              background: "#ff6b6b",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
            },
          });
        } else {
          toast.error("Failed to load your builds. Please try again.", {
            duration: 3000,
            style: {
              background: "#ff6b6b",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
            },
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserBuilds();
  }, [user]);

  // Delete build handler (actual delete)
  const handleDeleteConfirmed = async () => {
    if (!buildToDelete) return;
    setDeleteLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to delete builds", {
          duration: 2000,
          style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
        });
        setDeleteLoading(false);
        setDialogOpen(false);
        return;
      }

      await axios.delete(`${backendUrl}/api/build/builds/delete/${buildToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBuilds((prev) => prev.filter((b) => b._id !== buildToDelete));
      toast.success("Build deleted successfully.", {
        duration: 2000,
        style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to delete builds", {
          duration: 2000,
          style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
        });
      } else {
        toast.error("Failed to delete build.", {
          duration: 2000,
          style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
        });
      }
    } finally {
      setDeleteLoading(false);
      setDialogOpen(false);
      setBuildToDelete(null);
    }
  };

  // Open dialog when delete is requested
  const handleDelete = (buildId) => {
    setBuildToDelete(buildId);
    setDialogOpen(true);
  };

  // Publish/Unpublish handler
  const handlePublishToggle = async (buildId) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to publish builds", {
          duration: 2000,
          style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
        });
        return;
      }

      const response = await axios.patch(
        `${backendUrl}/api/build/builds/publish/${buildId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBuilds((prev) =>
        prev.map((b) =>
          b._id === buildId ? { ...b, published: response.data.published } : b
        )
      );
      toast.success(response.data.message, {
        duration: 2000,
        style: { background: "#7315E5", color: "#fff", fontWeight: "bold" },
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to publish builds", {
          duration: 2000,
          style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
        });
      } else {
        toast.error("Failed to update publish status.", {
          duration: 2000,
          style: { background: "#ff6b6b", color: "#fff", fontWeight: "bold" },
        });
      }
    }
  };

  // Edit handler
  const handleEdit = (build) => {
    // Store the build data in localStorage to pass to the ChoosePartsPage
    localStorage.setItem("editingBuild", JSON.stringify(build));

    // Navigate to the choose parts page
    navigate("/chooseparts?edit=true");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl text-gray-600">
          Please log in to view your builds
        </h3>
        <p className="text-gray-500 mt-2">
          You need to be logged in to see your saved builds.
        </p>
      </div>
    );
  }

  if (builds.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl text-gray-600">No saved builds found</h3>
        <p className="text-gray-500 mt-2">
          Start creating your custom PC build!
        </p>
      </div>
    );
  }

  return (
    <>
      <DialogAlert
        Title="Delete Build?"
        message="Do you really want to delete this build? This action cannot be undone."
        Agree="Delete"
        Disagree="Cancel"
        open={dialogOpen}
        handleClose={() => { setDialogOpen(false); setBuildToDelete(null); }}
        handleAgree={handleDeleteConfirmed}
        loading={deleteLoading}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {builds.map((build) => (
          <PCBuildCard
            key={build._id}
            name={build.name}
            createdAt={build.createdAt}
            image={build.image}
            published={build.published}
            onClick={() => setSelectedBuild(build)}
            onDelete={() => handleDelete(build._id)}
            onPublishToggle={() => handlePublishToggle(build._id)}
            onEdit={() => handleEdit(build)}
          />
        ))}
      </div>
      {selectedBuild && (
        <BuildDetailsPopup
          build={selectedBuild}
          onClose={() => setSelectedBuild(null)}
        />
      )}
    </>
  );
}
