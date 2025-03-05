import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User } from '../types';
import { biharDistricts } from '../data/districts';
import { createUser, getUserByEmail } from '../utils/storage';
import { Loader2 } from 'lucide-react';
import { encryptMobileNumber } from '../utils/encryption';
import { indiaStates } from '../data/states';

interface RegistrationFormProps {
  onSuccess: (user: User) => void;
  referredBy?: string;
}

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  biharDistrict: string; profileUrl: string;
  createdAt: string;
  status: string; points: string;
  countryCode: string; isRegistered: string; isMember: string; currentCountry: string; currentState: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, referredBy }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLanguage] = useState('en');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();
  const handleOnclick = () => {
    setLanguage(prevState => (prevState === 'en' ? 'hi' : 'en'));
    // it can also be written like this
    // setLanguage(language === 'en' ? 'da' : 'en');
    // But the 1st is more robust when the event happens more frequently.
  };
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Check if email already exists
      if (data.email == '' || data.email == null) {
        data.email = 'email@notprovided.yet'
      }
      const existingUser = getUserByEmail(data.email);
      if (existingUser) {
        toast.error('This email is already registered');
        setIsSubmitting(false);
        return;
      }
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
        data.countryCode, data.isRegistered, data.isMember, data.currentCountry, data.currentState
      );
      console.log(newUser);
      // Reset form
      reset();

      // Notify parent component of success
      onSuccess(newUser);

      if (!referredBy) {
        toast.success('Registration successful!');
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
      <button className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 px-4 rounded' value={lang} onClick={handleOnclick}>
        {lang === 'en' ? 'हिंदी' : 'English'}
      </button>
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

      <div>
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
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? 'Currently residing in which State? *' : 'वर्तमान में किस राज्य में रह रहे हैं? *'}
        </label>
        <select
          id="district"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.biharDistrict ? 'border-red-500' : 'border'
            }`}
          {...register('currentState', lang == 'en' ? { required: 'Please select a state' } : { required: 'कृपया एक राज्य चुनें' })}
        >
          <option value="">Select State</option>
          {indiaStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.biharDistrict && (
          <p className="mt-1 text-sm text-red-600">{errors.biharDistrict.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">
          {lang == 'en' ? 'Which District in Bihar you belong to? *' : 'आप बिहार के किस जिले से हैं? *'}
        </label>
        <select
          id="district"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm ${errors.biharDistrict ? 'border-red-500' : 'border'
            }`}
          {...register('biharDistrict', lang == 'en' ? { required: 'Please select a district' } : { required: 'कृपया एक जिला चुनें' })}
        >
          <option value="">Select District</option>
          {biharDistricts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors.biharDistrict && (
          <p className="mt-1 text-sm text-red-600">{errors.biharDistrict.message}</p>
        )}
      </div>

      <div>
        {lang == 'en' ?
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-yellow-400"
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