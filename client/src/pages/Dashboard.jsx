import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';

const Dashboard = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/drives');
        setDrives(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching drives", error);
        setLoading(false);
      }
    };
    fetchDrives();
  }, []);

  const handleRSVP = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/drives/${id}/rsvp`);
      alert("Successfully RSVP'd!");
    } catch (error) {
      alert(error.response?.data?.message || "Error RSVPing");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">City Dashboard</h1>
          <p className="text-gray-600 mt-2">Find and join cleaning campaigns around India.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 py-20 animate-pulse text-xl">Loading campaigns...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drives.length === 0 && <p className="text-gray-500">No approved drives available yet.</p>}
          {drives.map((drive) => (
            <div key={drive._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <div className="h-48 bg-gray-200 relative">
                {drive.beforeImages && drive.beforeImages.length > 0 ? (
                  <img src={drive.beforeImages[0]} alt="Before" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full bg-primary-100 text-primary-500 font-medium">Image Placeholder</div>
                )}
                <div className="absolute top-4 right-4 bg-white text-primary-600 px-3 py-1 rounded-full text-xs font-bold shadow">
                  {drive.city}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{drive.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">{drive.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary-500" /> {drive.location?.address}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary-500" /> {new Date(drive.date).toLocaleDateString()} at {drive.time}
                  </p>
                  {drive.fundraisingTarget > 0 && (
                    <p className="text-sm font-semibold text-green-600 flex items-center gap-2">
                      <FaRupeeSign className="text-green-600" /> {drive.amountRaised} / {drive.fundraisingTarget} Raised
                    </p>
                  )}
                </div>
                {user ? (
                   <button onClick={() => handleRSVP(drive._id)} className="w-full bg-primary-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-700 transition">
                     Volunteer Now
                   </button>
                ) : (
                   <p className="text-sm text-primary-600 text-center font-medium bg-primary-50 py-2 rounded-lg">Login to RSVP</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
