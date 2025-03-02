import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User } from '../types';
import { biharDistricts } from '../data/districts';
import { createUser, getUserByEmail } from '../utils/storage';
import { Loader2 } from 'lucide-react';
import { encryptMobileNumber } from '../utils/encryption';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Check if email already exists
      const existingUser = getUserByEmail(data.email);
      if (existingUser) {
        toast.error('This email is already registered');
        setIsSubmitting(false);
        return;
      }
      // Create new user
      const newUser = createUser(
        encryptMobileNumber(data.phoneNumber),
        data.fullName,
        data.phoneNumber,
        data.email, data.biharDistrict, referredBy ? referredBy : '',
        // data.profileUrl, 
        referredBy ? 'http://nrb.jansuraaj.org/members/' + referredBy : 'http://nrb.jansuraaj.org/members/' + encryptMobileNumber(data.phoneNumber),
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
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.fullName ? 'border-red-500' : 'border'
            }`}
          {...register('fullName', { required: 'Full name is required' })}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number *
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : 'border'
            }`}
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number'
            }
          })}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border'
            }`}
          {...register('email', {
            required: 'Email is required',
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
        <label htmlFor="district" className="block text-sm font-medium text-gray-700">
          District *
        </label>
        <select
          id="district"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.biharDistrict ? 'border-red-500' : 'border'
            }`}
          {...register('biharDistrict', { required: 'Please select a district' })}
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
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
      </div>
    </form>
  );
};

export default RegistrationForm;