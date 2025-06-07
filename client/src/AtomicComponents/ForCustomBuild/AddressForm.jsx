// src/components/AddressForm.jsx
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AddressForm() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-purple-700 text-lg mb-4">Confirm your address</h3>
      <div className="space-y-3">
        <input
          type="text"
          value={user?.address || ''}
          placeholder="Address"
          readOnly
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100"
        />
        <input
          type="text"
          value={user?.district || ''}
          placeholder="District"
          readOnly
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100"
        />
        <input
          type="text"
          value={user?.city || ''}
          placeholder="City"
          readOnly
          className="w-full border rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100"
        />
        <button
          onClick={() => navigate('/user/profile')}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-8 rounded-md transition-colors block mx-auto"
        >
          Change
        </button>
      </div>
    </div>
  );
}
