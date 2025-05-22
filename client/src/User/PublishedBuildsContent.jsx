import React, { useEffect, useState } from "react";
import PublishedBuildCard from "../AtomicComponents/Cards/PublishedBuildCard";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PublishedBuildsContent() {
  const [publishedBuilds, setPublishedBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBuilds = async () => {
      if (!user || !user._id) {
        setLoading(false);
        return;
      }
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/build/builds/user/${user._id}`);
        if (response.data.success) {
          const published = response.data.builds.filter(b => b.published === true);
          setPublishedBuilds(published);
        } else {
          setPublishedBuilds([]);
        }
      } catch (error) {
        setPublishedBuilds([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBuilds();
  }, [user]);

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
        <h3 className="text-xl text-gray-600">Please log in to view your published builds</h3>
      </div>
    );
  }

  if (publishedBuilds.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl text-gray-600">No published builds found</h3>
        <p className="text-gray-500 mt-2">Publish a build to see it here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {publishedBuilds.map((build) => (
        <PublishedBuildCard
          key={build._id}
          buildName={build.name}
          image={build.image}
          createdAt={build.createdAt}
          components={build.components}
        />
      ))}
    </div>
  );
}
