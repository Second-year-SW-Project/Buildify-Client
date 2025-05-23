import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function StorePickup() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-purple-700 text-lg mb-4">Where to Pick Up</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <LocationOnIcon className="text-purple-700 mt-1" />
          <div>
            <p className="font-medium">Buildify Store</p>
            <p className="text-gray-600">70 Washington Square South, New York, NY 10012, United States</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <PhoneIcon className="text-purple-700 mt-1" />
          <div>
            <p className="font-medium">Contact Number</p>
            <p className="text-gray-600">+1 1123 456 789</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AccessTimeIcon className="text-purple-700 mt-1" />
          <div>
            <p className="font-medium">Store Hours</p>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
} 