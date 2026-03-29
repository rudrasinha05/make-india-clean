import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaHandsHelping } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Make India Clean
          </h1>
          <p className="mt-4 max-w-2xl text-xl mx-auto mb-10 text-primary-100">
            Join the nationwide movement to restore, clean, and sustain the beauty of India. Every hand makes a difference.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
              Join Movement
            </Link>
            <Link to="/dashboard" className="bg-primary-700 text-white hover:bg-primary-800 font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
              Find a Drive
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-primary-50 rounded-xl shadow-sm border border-primary-100">
              <FaUsers className="text-4xl text-primary-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600 font-medium">Active Volunteers</p>
            </div>
            <div className="p-6 bg-primary-50 rounded-xl shadow-sm border border-primary-100">
              <FaMapMarkerAlt className="text-4xl text-primary-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600 font-medium">Areas Cleaned</p>
            </div>
            <div className="p-6 bg-primary-50 rounded-xl shadow-sm border border-primary-100">
              <FaHandsHelping className="text-4xl text-primary-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">₹5M+</h3>
              <p className="text-gray-600 font-medium">Funds Raised</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
