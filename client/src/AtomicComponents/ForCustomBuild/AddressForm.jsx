// src/components/AddressForm.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDeliveryInfo, getProvinces, getDistrictsByProvince, calculateDeliveryTotal } from '../../utils/locationData';
import { setAuthUser } from '../../Store/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AddressForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    address: user?.address || '',
    province: user?.province || '',
    district: user?.district || ''
  });

  // Location data
  const provinces = getProvinces();
  const [availableDistricts, setAvailableDistricts] = useState([]);

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        address: user.address || '',
        province: user.province || '',
        district: user.district || ''
      });
      
      // Set available districts based on user's province
      if (user.province) {
        setAvailableDistricts(getDistrictsByProvince(user.province));
      }
    }
  }, [user]);

  // Update available districts when province changes
  useEffect(() => {
    if (formData.province) {
      const districts = getDistrictsByProvince(formData.province);
      setAvailableDistricts(districts);
      // Reset district if it's not valid for the selected province
      if (formData.district && !districts.includes(formData.district)) {
        setFormData(prev => ({ ...prev, district: "" }));
      }
    } else {
      setAvailableDistricts([]);
      setFormData(prev => ({ ...prev, district: "" }));
    }
  }, [formData.province]);

  // Get delivery info for the current address
  const deliveryInfo = user?.province && user?.district 
    ? getDeliveryInfo(user.province, user.district)
    : null;

  // Get preview delivery info for the form data during editing
  const previewDeliveryInfo = isEditing && formData.province && formData.district
    ? getDeliveryInfo(formData.province, formData.district)
    : null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    setFormData({
      address: user?.address || '',
      province: user?.province || '',
      district: user?.district || ''
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      const updateData = {
        address: formData.address.trim(),
        province: formData.province.trim(),
        district: formData.district.trim()
      };

      const response = await axios.post(
        `${backendUrl}/api/v1/users/update-profile`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      // Update Redux store with new user data
      dispatch(setAuthUser(response.data.data.user));
      
      // Show success message
      toast.success("Address updated successfully! Delivery charges have been recalculated.", {
        duration: 4000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontSize: '14px',
        },
      });
      
      setIsEditing(false);
    } catch (error) {
      const serverError = error.response?.data?.error;
      toast.error(`Update failed: ${serverError || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Validation check
  const isFormValid = formData.address.trim() && formData.province && formData.district;

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-purple-700 text-lg">Confirm your address</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm border border-purple-600 hover:border-purple-700 px-3 py-1 rounded-md transition-colors"
          >
            Edit
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          {isEditing ? (
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address"
              rows={2}
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            />
          ) : (
            <input
              type="text"
              value={user?.address || 'No address provided'}
              readOnly
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none bg-gray-100 text-gray-700"
            />
          )}
        </div>

        {/* Province Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
          {isEditing ? (
            <select
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={user?.province || 'No province selected'}
              readOnly
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none bg-gray-100 text-gray-700"
            />
          )}
        </div>

        {/* District Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
          {isEditing ? (
            <select
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              disabled={!formData.province}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select District</option>
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={user?.district || 'No district selected'}
              readOnly
              className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none bg-gray-100 text-gray-700"
            />
          )}
        </div>

        {/* Preview Delivery Info (during editing) */}
        {previewDeliveryInfo && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 font-medium">New Delivery Charge:</span>
              <span className="text-blue-600 font-semibold">
                LKR {previewDeliveryInfo.charge.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Current Delivery Info */}
        {deliveryInfo && !isEditing && (
          <div className="mt-3 p-3 bg-purple-50 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-700 font-medium">Delivery Charge:</span>
              <span className="text-purple-600 font-semibold">
                LKR {deliveryInfo.charge.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Missing Address Warning */}
        {!user?.province || !user?.district ? (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-400 rounded-full mr-2"></div>
              <span className="text-amber-700 text-sm">
                Complete your address to calculate delivery charges
              </span>
            </div>
          </div>
        ) : null}

        {/* Action Buttons for Edit Mode */}
        {isEditing && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={loading || !isFormValid}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Validation Messages */}
        {isEditing && (
          <div className="space-y-1">
            {!formData.province && (
              <p className="text-sm text-amber-600">
                Please select a province to enable district selection
              </p>
            )}
            {formData.province && !formData.district && (
              <p className="text-sm text-amber-600">
                Please select a district for accurate delivery calculation
              </p>
            )}
            {!formData.address.trim() && (
              <p className="text-sm text-amber-600">
                Please enter your complete address
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
