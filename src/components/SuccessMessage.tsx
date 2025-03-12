import React, { useState } from 'react';
import { User } from '../types';
import { CheckCircle, Copy, Share2, User as UserIcon, Facebook } from 'lucide-react';
import { toast } from 'react-toastify';
import prashantImage from '../assets/Prashant.jpg';
import ShareFBPost from './ShareFBPost';

interface SuccessMessageProps {
  user: User;
  onReferFriend: () => void;
  onViewDashboard: () => void;
  lang: String;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ user, onReferFriend, onViewDashboard, lang }) => {
  const copyProfileUrl = () => {
    navigator.clipboard.writeText(user.profileUrl);
    toast.success('Profile URL copied to clipboard!');
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const fbUrl = 'https://nrb.jansuraaj.org';
  // Function to open a responsive window
  const openResponsiveFBWindow = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate new window dimensions based on the screen size
    let width = 600;
    let height = 400;

    // Adjust window size for small screens (like mobile devices)
    if (screenWidth < 768) {
      width = screenWidth - 50;  // Allow for margins/padding
      height = screenHeight - 150;
    }
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fbUrl
    )}`;
    // Open the new window with responsive size
    window.open(
      facebookShareURL, // URL to open
      '_blank', // Open in a new tab or window
      `width=${width},height=${height},resizable=yes,scrollbars=yes`
    );
  };
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      {lang == 'en' ? (

        <div>

          {/* <h2 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h2> */}
          <h1 className='text-green-700 mb-4' >Congratulations, you are now registered with Jan Suraaj.</h1>
          <p className="text-green-700 mb-4">
            Bihar is detereorating and Biharis are forced to leave their family and friends behind to look for work. Bihar will change only when every Bihari is reconnected with their roots.
          </p>
          <h1 className='text-green-700 mb-4 text-lg font-bold'>अब लीजिये बिहार की ज़िम्मेदारी और जोड़िये गाँव के पांच साथी </h1>
        </div>) : (
        <div><h1 className='text-green-700 mb-4' >जन सुराज से जुड़ने के लिए धन्यवाद।</h1><p className="text-green-700 mb-4">
          {/* अब आप बिहार की बेहतरी के लिए काम करने वाले पंजीकृत सदस्य हैं।
    पहले कदम के रूप में हम आपसे अनुरोध करते हैं कि आप अपने गांव की जिम्मेदारी लें और अपने गांव के उन लोगों के संपर्क हमारे साथ साझा करें जो जन सुराज की योजनाओं से लाभान्वित हो सकते हैं| */}
          बिहार बदहाल है और बिहारी काम के लिए दर दर भटकने को बेहाल है। जब हर बिहारी गाँव से जुड़कर काम करेगा तब ही बिहार बदलेगा।
        </p>
          <h1 className='text-green-700 mb-4 text-lg font-bold'>अब लीजिये बिहार की ज़िम्मेदारी और जोड़िये गाँव के पांच साथी </h1>
        </div>)}

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
          {lang == 'en' ? 'Add 5 people' : 'जोड़िये गाँव के पांच साथी'}
        </button>
        <button
          onClick={() => window.open('https://www.jansuraaj.org/membership-registration')}
          className="flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <UserIcon className="h-5 w-5 mr-2" />
          {lang == 'en' ? 'Download Jan Suraaj membership' : 'पार्टी सदस्यता कार्ड प्राप्त करें'}
        </button>
        {/* <button
          onClick={onViewDashboard}
          className="flex items-center justify-center py-2 px-6 border border-yellow-300 rounded-md shadow-sm text-sm font-medium text-yellow-700 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <UserIcon className="h-5 w-5 mr-2" />
          View Dashboard
        </button> */}
        <button
          onClick={openResponsiveFBWindow}
          className="flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <Facebook className="h-5 w-5 mr-2" />
          {lang == 'en' ? 'Post on Facebook and help us' : 'फेसबुक पर पोस्ट करें और हमारा हौसला बढ़ाएं'}
        </button>
      </div>
      {/* <ShareFBPost isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        url="https://nrb.jansuraaj.org"
        title={lang == 'en' ? "Connect with Prashant Kishore's team to improve Bihar" : 'प्रशांत किशोर की टीम से जुड़ें'} /> */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 p-6">
        <img src={prashantImage} alt="Jan Suraaj" className="h-80 w-80" />
      </div>
    </div>
  );
};

export default SuccessMessage;