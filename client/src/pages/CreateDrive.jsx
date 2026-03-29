import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CreateDrive = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    address: '',
    lat: '',
    lng: '',
    date: '',
    time: '',
    fundraisingTarget: 0,
    beforeImageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        beforeImages: formData.beforeImageUrl ? [formData.beforeImageUrl] : []
      };
      
      await axios.post('http://localhost:5000/api/drives', payload);
      alert('Drive created successfully! Awaiting Admin approval.');
      navigate('/dashboard');
    } catch (error) {
       alert(error.response?.data?.message || 'Error creating drive');
    }
    setLoading(false);
  };

  if (!user || user.role === 'Volunteer') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600">Only Organizers and Admins can create cleaning drives.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Start a Cleaning Drive</h1>
        <p className="text-gray-600 mb-8 border-b pb-4">Fill in the details below to organize a cleaning campaign in your city.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
              <input type="text" name="title" required onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="e.g. Juhu Beach Cleanup" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" name="city" required onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="e.g. Mumbai" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" rows="4" required onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="Describe the goal, items to bring, and expectations..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exact Address / Landmark</label>
              <input type="text" name="address" required onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="Near XYZ Cafe" />
            </div>
            <div className="grid grid-cols-2 gap-2">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                 <input type="number" step="any" name="lat" onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="Optional" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                 <input type="number" step="any" name="lng" onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="Optional" />
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" name="date" required onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="time" name="time" required onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fundraising Target (₹) (Optional)</label>
              <input type="number" name="fundraisingTarget" onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="0" />
            </div>
            <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Before Image URL (Cloudinary)</label>
             <input type="url" name="beforeImageUrl" onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" placeholder="https://..." />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              {loading ? 'Submitting...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDrive;
