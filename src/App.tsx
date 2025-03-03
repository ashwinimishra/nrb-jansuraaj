import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from './types';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';
import ReferralForm from './components/ReferralForm';
import ProfileDashboard from './components/ProfileDashboard';
import { Users } from 'lucide-react';

function App() {
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  
  const handleRegistrationSuccess = (user: User) => {
    setRegisteredUser(user);
  };
  
  const handleReferFriend = () => {
    setShowReferralForm(true);
    setShowDashboard(false);
  };
  
  const handleViewDashboard = () => {
    setShowDashboard(true);
    setShowReferralForm(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <header className="bg-indigo-700 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Users className="h-8 w-8 mr-3" />
            <h1 className="text-2xl font-bold">NRB Registration Portal</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {!registeredUser ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h2 className="text-xl font-semibold text-indigo-800">Register for NRB</h2>
                <p className="text-indigo-600 text-sm mt-1">
                  Join us in working for the betterment of Bihar
                </p>
              </div>
              
              <div className="p-6">
                <RegistrationForm onSuccess={handleRegistrationSuccess} />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {!showReferralForm && !showDashboard && (
                <SuccessMessage 
                  user={registeredUser} 
                  onReferFriend={handleReferFriend} 
                  onViewDashboard={handleViewDashboard}
                />
              )}
              
              {showReferralForm && <ReferralForm userId={registeredUser.id} />}
              
              {showDashboard && <ProfileDashboard user={registeredUser} />}
              
              {(showReferralForm || showDashboard) && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setShowReferralForm(false);
                      setShowDashboard(false);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    ← Back to Success Page
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} NRB. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-1">Working for a better Bihar</p>
        </div>
      </footer>
    </div>
  );
}

export default App;