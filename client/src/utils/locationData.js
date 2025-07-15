export const locationData = {
  "Western": [
    "Colombo",
    "Gampaha", 
    "Kalutara"
  ],
  "Central": [
    "Kandy",
    "Matale",
    "Nuwara Eliya"
  ],
  "Southern": [
    "Galle",
    "Matara",
    "Hambantota"
  ],
  "Northern": [
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullaitivu",
    "Vavuniya"
  ],
  "Eastern": [
    "Ampara",
    "Batticaloa",
    "Trincomalee"
  ],
  "North Western": [
    "Kurunegala",
    "Puttalam"
  ],
  "North Central": [
    "Anuradhapura",
    "Polonnaruwa"
  ],
  "Uva": [
    "Badulla",
    "Monaragala"
  ],
  "Sabaragamuwa": [
    "Kegalle",
    "Ratnapura"
  ]
};

// Delivery charges based on province and district (in LKR)
export const deliveryCharges = {
  "Western": {
    base: 500,
    districts: {
      "Colombo": 500,     // Main city - lowest charge
      "Gampaha": 750,     // Near Colombo
      "Kalutara": 1000    // Further from main hub
    }
  },
  "Central": {
    base: 1200,
    districts: {
      "Kandy": 1200,      // Major city
      "Matale": 1500,     // Smaller city
      "Nuwara Eliya": 1800 // Remote hill country
    }
  },
  "Southern": {
    base: 1500,
    districts: {
      "Galle": 1500,      // Major coastal city
      "Matara": 1800,     // Further south
      "Hambantota": 2200  // Remote southern area
    }
  },
  "Northern": {
    base: 2500,
    districts: {
      "Jaffna": 2500,     // Main northern city
      "Kilinochchi": 3000,
      "Mannar": 3200,
      "Mullaitivu": 3500,
      "Vavuniya": 2800
    }
  },
  "Eastern": {
    base: 2200,
    districts: {
      "Ampara": 2500,
      "Batticaloa": 2200, // Main eastern city
      "Trincomalee": 2400
    }
  },
  "North Western": {
    base: 1800,
    districts: {
      "Kurunegala": 1800, // Main city in province
      "Puttalam": 2000    // Coastal area
    }
  },
  "North Central": {
    base: 2000,
    districts: {
      "Anuradhapura": 2000, // Ancient city
      "Polonnaruwa": 2200   // Historical city
    }
  },
  "Uva": {
    base: 2200,
    districts: {
      "Badulla": 2200,    // Main city
      "Monaragala": 2500  // Remote area
    }
  },
  "Sabaragamuwa": {
    base: 1500,
    districts: {
      "Kegalle": 1500,    // Close to Western province
      "Ratnapura": 1800   // Gem city
    }
  }
};

// Service charges
export const serviceCharges = {
  fixedServiceCharge: 0, // No service charge (deprecated - use calculateServiceCharge instead)
  assemblyCharge: 0,     // No assembly charge
  warrantyExtension: 0   // No warranty extension charge
};

// Calculate service charge based on component count
export const calculateServiceCharge = async (componentCount) => {
  try {
    const response = await fetch(`http://localhost:8000/api/build-transactions/calculate-service-charge?componentCount=${componentCount}`);
    const data = await response.json();
    
    if (response.ok) {
      return data.serviceCharge;
    } else {
      console.error('Error calculating service charge:', data.message);
      return 0; // Fallback to 0 if API fails
    }
  } catch (error) {
    console.error('Error fetching service charge:', error);
    return 0; // Fallback to 0 if API fails
  }
};

export const getProvinces = () => {
  return Object.keys(locationData);
};

export const getDistrictsByProvince = (province) => {
  return locationData[province] || [];
};

export const getAllDistricts = () => {
  return Object.values(locationData).flat();
};

// Get delivery charge for a specific province and district
export const getDeliveryCharge = (province, district) => {
  if (!province || !district) {
    return 0;
  }
  
  const provinceData = deliveryCharges[province];
  if (!provinceData) {
    return 1000; // Default charge if province not found
  }
  
  const districtCharge = provinceData.districts[district];
  return districtCharge || provinceData.base;
};

// Get all available service charges
export const getServiceCharges = () => {
  return serviceCharges;
};

// Calculate total delivery cost
export const calculateDeliveryTotal = (province, district) => {
  return getDeliveryCharge(province, district);
};

// Get delivery info
export const getDeliveryInfo = (province, district) => {
  const charge = getDeliveryCharge(province, district);
  
  return {
    charge,
    province,
    district
  };
};

