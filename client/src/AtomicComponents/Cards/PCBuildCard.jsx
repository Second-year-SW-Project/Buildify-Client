import React from "react";
import { Card, CardContent, Button } from "@mui/material";

const PCBuildCard = ({ image, name, score, specs }) => {
  return (
    <Card className="p-6 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 flex flex-col md:flex-row items-center md:items-start gap-6 w-full max-w-2xl mb-3">
      {/* PC Image */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        <img
          src={image}
          alt={name}
          className="w-40 h-40 object-cover rounded-lg"
        />
      </div>

      {/* PC Info */}
      <CardContent className="flex-1">
        {/* Score */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold text-purple-600">
            Score: {score}
          </span>
          <Button className="bg-purple-500 hover:bg-purple-700 text-white hover:text-white px-4 py-1 rounded-lg">
            Edit
          </Button>
        </div>

        {/* Specifications */}
        <ul className="mt-4 text-gray-700">
          {specs.map(([key, value], index) => (
            <li key={index} className="flex justify-between gap-4">
              <span className="font-medium">{key}</span>
              <span className="text-right">{value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PCBuildCard;
