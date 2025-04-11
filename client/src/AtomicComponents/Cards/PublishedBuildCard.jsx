import React from "react";
import { Card, CardContent, Avatar } from "@mui/material";

const PublishedBuildCard = ({
  image,
  buildName,
  username,
  userIcon,
  description,
  score,
}) => {
  return (
    <Card className="rounded-3xl shadow-lg bg-white w-60 overflow-hidden mb-4">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={buildName} className="w-full h-48 object-cover" />
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black ">{buildName}</h2>
          <span className="text-md font-semibold text-purple-600">
            Score: {score}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700  text-sm mt-2 line-clamp-3">
          {description}
        </p>

        {/* User Info */}
        <div className="flex items-center gap-3 mt-4">
          <Avatar src={userIcon} alt={username} className="bg-purple-500" />
          <span className="font-medium text-black dark:text-white">
            {username}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishedBuildCard;
