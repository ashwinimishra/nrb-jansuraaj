import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from './types';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';
import ReferralForm from './components/ReferralForm';
import ProfileDashboard from './components/ProfileDashboard';
import { Users } from 'lucide-react';
import logoImage from './assets/logo.jpeg';

function App() {
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [lang, setLanguage] = useState('hi');

  const handleRegistrationSuccess = (user: User) => {
    setRegisteredUser(user);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
  }
  const handleReferFriend = () => {
    setShowReferralForm(true);
    setShowDashboard(false);
    // setLanguage(lang);
  };

  const handleViewDashboard = () => {
    setShowDashboard(true);
    setShowReferralForm(false);
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={2000} />



      <header className="bg-gradient-to-r from-yellow-300 to-yellow-500 py-4 px-4 flex items-center justify-center space-x-4">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <a href='https://jansuraaj.org'>
              <img
                src={logoImage}
                alt="Jan Suraaj Logo"
                className="w-full h-full object-cover"
              /></a></div></div>
        <div className="flex flex-col">
          {/* <Users className="h-8 w-8 mr-3" /> */}
          <h1 className="text-lg md:text-2xl font-bold text-black">Jan Suraaj Party</h1>
          <h2 className="text-sm md:text-base text-black">सही लोग | सही सोच | सामूहिक प्रयास</h2>
        </div>

        {/* Desktop Navigation */}
        {/* <nav className="hidden md:flex space-x-4 items-center">
        {menuItems.map((item, index) => (
          <div key={index} className="relative group">
            <a 
              href={item.href} 
              className="flex items-center hover:text-yellow-500 transition-colors"
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
            </a>
            You can add dropdown logic here if needed -- comment this line
          </div>
        ))}
      </nav> */}

        {/* Language and Action Buttons */}
        {/* <div className="flex items-center space-x-2">
        <button className="bg-gray-700 px-2 py-1 rounded">हिंदी</button>
        <button className="bg-yellow-500 text-black px-4 py-1 rounded">सहयोग करें</button>
        
        Mobile Menu Toggle -- comment this line
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>
      </div> */}

        {/* Mobile Menu (Responsive Drawer) */}
        {/* {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-50">
          <div className="flex flex-col p-4">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="py-2 border-b border-gray-700 flex justify-between items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>
      )} */}
      </header>



      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {!registeredUser ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h2 className="text-xl font-semibold text-indigo-800">Register for NRB</h2>
                <p className="text-indigo-600 text-sm mt-1">
                  Join us in working for the betterment of Bihar
                </p>
              </div> */}

              <div className="p-6">
                <RegistrationForm onSuccess={handleRegistrationSuccess} changeLanguage={handleLanguageChange}
                  currentlang={lang} />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {!showReferralForm && !showDashboard && (
                <SuccessMessage
                  user={registeredUser}
                  onReferFriend={handleReferFriend}
                  onViewDashboard={handleViewDashboard}
                  lang={lang}
                />
              )}

              {showReferralForm && <ReferralForm userId={registeredUser.id} lang={lang} />}

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
                    {lang == 'en' ? '← Back to Previous Page' : '← वापस जाएँ'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Jan Suraaj. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-1">Jan Suraaj for New Bihar</p>
        </div>
      </footer>
    </div>
  );
}

export default App;