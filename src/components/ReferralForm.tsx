import React, { useState } from 'react';
import { ReferralFormData, User } from '../types';
import RegistrationForm from './RegistrationForm';
import { PlusCircle } from 'lucide-react';

interface ReferralFormProps {
  userId: string;
}

const ReferralForm: React.FC<ReferralFormProps> = ({ userId }) => {
  const [referrals, setReferrals] = useState<User[]>([]);
  const [showNewReferralForm, setShowNewReferralForm] = useState(true);
  const [lang, setLanguage] = useState('hi');
  const handleReferralSuccess = (newReferral: User) => {
    setReferrals([...referrals, newReferral]);
    setShowNewReferralForm(false);
  };

  const handleAddAnotherReferral = () => {
    setShowNewReferralForm(true);
  };
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    console.log(newLang);
  }
  return (
    <div className="mt-8 space-y-6">
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{lang == 'hi' ? 'Refer Your Friends' : 'अपने साथियों को भी जोड़ें'}</h2>

        {referrals.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">{lang == 'hi' ? 'Your Referrals' : 'आपके रेफरल'}</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="divide-y divide-gray-200">
                {referrals.map((referral, index) => (
                  <li key={referral.id} className="py-3">
                    <p className="text-sm font-medium text-gray-800">{referral.fullName}</p>
                    <p className="text-sm text-gray-500">{referral.email}</p>
                    <p className="text-sm text-gray-500">{referral.phoneNumber}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {showNewReferralForm ? (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Add a New Referral</h3>
            <RegistrationForm onSuccess={handleReferralSuccess} referredBy={userId} changeLanguage={handleLanguageChange} />
          </div>
        ) : (
          <button
            onClick={handleAddAnotherReferral}
            className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Another Referral
          </button>
        )}
      </div>
    </div>
  );
};

export default ReferralForm;