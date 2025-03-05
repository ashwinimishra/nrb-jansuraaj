import React from 'react';
import { User } from '../types';
import { CheckCircle, Copy, Share2, User as UserIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import prashantImage from '../assets/Prashant.jpeg';

interface SuccessMessageProps {
  user: User;
  onReferFriend: () => void;
  onViewDashboard: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ user, onReferFriend, onViewDashboard }) => {
  const copyProfileUrl = () => {
    navigator.clipboard.writeText(user.profileUrl);
    toast.success('Profile URL copied to clipboard!');
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h2>

      <p className="text-green-700 mb-4">
        You are now a registered member working for the betterment of Bihar. As a first step we request you to add more members to this movement using refer a friend button.
      </p>
      <p className="text-green-700 mb-4">
        अपने साथियों को भी बिहार की बेहतरी की इस मुहीम में जोड़ने के लिए नीचे दिए गए बटन को क्लिक करें|
      </p>

      {/* <div className="bg-white border border-green-200 rounded-md p-3 mb-6">
        <p className="text-sm text-gray-500 mb-1">Your profile URL is:</p>
        <div className="flex items-center justify-center space-x-2">
          <p className="font-medium text-gray-800">{user.profileUrl}</p>
          <button
            onClick={copyProfileUrl}
            className="text-yellow-600 hover:text-yellow-800"
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div> */}

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={onReferFriend}
          className="flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Refer a Friend
        </button>

        {/* <button
          onClick={onViewDashboard}
          className="flex items-center justify-center py-2 px-6 border border-yellow-300 rounded-md shadow-sm text-sm font-medium text-yellow-700 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <UserIcon className="h-5 w-5 mr-2" />
          View Dashboard
        </button> */}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3 p-6">
        <img src={prashantImage} alt="Jan Suraaj" className="h-80 w-80" />
      </div>
    </div>
  );
};

export default SuccessMessage;