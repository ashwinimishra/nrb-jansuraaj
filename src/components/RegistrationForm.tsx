import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User } from '../types';
import { biharDistrictsEn, biharDistrictsHi } from '../data/districts';
import { createUser, getUserByEmail } from '../utils/storage';
import { Loader2 } from 'lucide-react';
import { encryptMobileNumber } from '../utils/encryption';
import { indiaStatesEn, indiaStatesHi } from '../data/states';

interface RegistrationFormProps {
  onSuccess: (user: User) => void;
  referredBy?: string;
  changeLanguage: (lang: string) => void;
  currentlang: string;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  biharDistrict: string; profileUrl: string;
  createdAt: string;
  status: string; points: string;
  countryCode: string; isRegistered: string; isMember: string; currentCountry: string; currentState: string;
  pincode: number;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, referredBy, changeLanguage, currentlang }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLanguage] = useState(currentlang);
  // console.log(lang);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const handleOnclick = () => {
    setLanguage(prevState => (prevState == 'en' ? 'hi' : 'en'));
    // it can also be written like this
    // setLanguage(lang === 'en' ? 'hi' : 'en');
    // But the 1st is more robust when the event happens more frequently.
    changeLanguage(lang);
  };
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      //if email is not provided set this to default
      if (data.email == '' || data.email == null) {
        data.email = 'email@notprovided.yet'
      }
      // Check if email already exists
      // const existingUser = getUserByEmail(data.email);
      // if (existingUser) {
      //   toast.error('This email is already registered');
      //   setIsSubmitting(false);
      //   return;
      // }
      const encryptedId = encryptMobileNumber(data.phoneNumber);
      const profileURL = 'http://nrb.jansuraaj.org/members/' + encryptedId;
      // Create new user
      const newUser = createUser(
        encryptedId,
        data.fullName,
        data.phoneNumber,
        data.email, data.biharDistrict, referredBy ? referredBy : '',
        // data.profileUrl, 
        profileURL,
        data.createdAt, data.status, data.points,
        data.countryCode, data.isRegistered, data.isMember, data.currentCountry, data.currentState, data.pincode,
      );
      // console.log(newUser);
      // Reset form
      reset();

      // Notify parent component of success
      onSuccess(newUser);
      changeLanguage(lang);
      if (!referredBy) {
        // toast.success('Registration successful!');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      {!referredBy ? <button className='bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold py-2 px-4 rounded' value={lang} onClick={handleOnclick}>
        {lang === 'en' ? 'हिंदी' : 'English'}
      </button> : <p>{lang === 'en' ? 'Adding more members from your village/block will help us create a network which can then be aided financially through Jan Suraj schemes' : 'आपके गांव/ब्लॉक से अधिक सदस्यों को जोड़ने से हमें एक नेटवर्क बनाने में मदद मिलेगी, जिससे जन सुराज योजनाओं के माध्यम से वित्तीय सहायता दी जा सकती है।'}</p>}
      {!referredBy ? <div className="flex flex-col items-center justify-center"> {lang == 'en' ? <p className="text-lg md:text-2xl font-bold text-black">Registration Form</p> : <p className="text-lg md:text-2xl font-bold text-black">रजिस्ट्रेशन फॉर्म</p>}</div> : <p></p>}
      {!referredBy ? <div className="bg-yellow border border-yellow-200 rounded-md p-3 mb-6">
        {lang == 'en' ? <h1 className="bg-yellow text-bold">
          <b>"Bihari"</b> as a term is used against all Non Resident Biharis in a manner of shame.
          Change starts with us! Let's connect ourselves, our friends and family to strengthen the fight for change.
        </h1>
          : <h1>
            <b>"बिहारी"</b> शब्द का प्रयोग बिहार से बाहर रह रहे बिहारियों के खिलाफ अपमानजनक तरीके से किया जाता है।
            बदलाव हमसे शुरू होता है! आइए परिवर्तन की लड़ाई को मजबूत करने के लिए स्वयं, अपने दोस्तों और परिवार के सदस्यों को इस मुहीम से जोड़ें।
          </h1>}
      </div> : <div />}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? 'Full Name *' : 'पूरा नाम *'}
        </label>
        <input
          id="fullName"
          type="text"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.fullName ? 'border-red-500' : 'border'
            }`}
          {...register('fullName', lang == 'en' ? { required: 'Full name is required' } : { required: 'पूरा नाम आवश्यक है' })}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? 'Mobile Number *' : 'मोबाइल नंबर *'}
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : 'border'
            }`}
          {...register('phoneNumber', lang == 'en' ? {
            required: 'Mobile number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number'
            },
          } : {
            required: 'मोबाइल नंबर आवश्यक है',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number'
            },
          })}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      {!(referredBy) &&
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            {lang == 'en' ? 'Currently you are residing in which State? *' : 'वर्तमान में आप किस राज्य में रह रहे हैं? *'}
          </label>
          <select
            id="state"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.currentState ? 'border-red-500' : 'border'
              }`}
            {...register('currentState', lang == 'en' ? { required: 'Please select a state' } : { required: 'कृपया एक राज्य चुनें' })}
          >
            <option value="">{lang == 'en' ? 'Select State' : 'राज्य चुनें'}</option>
            {lang == 'en' ? indiaStatesEn.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            )) : indiaStatesHi.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))
            }
          </select>
          {errors.currentState && (
            <p className="mt-1 text-sm text-red-600">{errors.currentState.message}</p>
          )}
        </div>}
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? 'Which District in Bihar you belong to? *' : 'आप बिहार के किस जिले से हैं? *'}
        </label>
        <select
          id="district"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.biharDistrict ? 'border-red-500' : 'border'
            }`}
          {...register('biharDistrict', lang == 'en' ? { required: 'Please select a district' } : { required: 'कृपया एक ज़िला चुनें' })}
        >
          <option value="">{lang == 'en' ? 'Select District' : 'ज़िला चुनें'}</option>
          {lang == 'en' ? biharDistrictsEn.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          )) :
            biharDistrictsHi.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))
          }
        </select>
        {errors.biharDistrict && (
          <p className="mt-1 text-sm text-red-600">{errors.biharDistrict.message}</p>
        )}
      </div>
      {/* <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? 'Email Address' : 'ई-मेल पता'}
        </label>
        <input
          id="email"
          type="email"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border'
            }`}
          {...register('email', {
            // required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }

          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div> */}
      <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? "Your Pin code in Bihar*" : 'बिहार में आपका पिन कोड *'}
        </label>
        <input
          id="pincode"
          type="pincode"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.pincode ? 'border-red-500' : 'border'
            }`}
          {...register('pincode', {
            required: lang == 'en' ? 'Pincode is required' : 'पिनकोड आवश्यक है',
            pattern: {
              value: /^8\d{5}$/,
              message: lang == 'en' ? 'Please enter a valid pincode belonging to bihar' : 'कृपया आपका बिहार का वैध पिनकोड दर्ज करें'
            }

          })}
        />
        {errors.pincode && (
          <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
        )}
      </div>
      <div>
        {lang == 'en' ?
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-yellow-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              'Register Now'
            )}
          </button>
          : <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-yellow-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                प्रक्रिया प्रगति पर है
              </>
            ) : (
              'विवरण दर्ज़ करें'
            )}
          </button>}
      </div>

    </form>
  );
};

export default RegistrationForm;