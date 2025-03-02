import { v4 as uuidv4 } from 'uuid';
import { User, ReferralStats } from '../types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { encryptMobileNumber } from './encryption';

// Simulate database operations with localStorage
const USERS_STORAGE_KEY = 'nrb_users';

// Get all users from storage
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Save all users to local storage
export const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};
// Save all users to database
export const saveUsersDB = async (users: User): Promise<void> => {
  try {
    //post req to server
    const res = await axios.post("http://127.0.0.1:3306/users", users);
    //incase of success
    if (res.status === 201) {
      toast.success("Registration successfully saved");
    }
  } catch (error) {
    //incase of error
    console.error("Error Creating User: ", error);
    toast.error("Error Creating User");
  }
};

// Create a new user
export const createUser = (
  id: string,
  fullName: string,
  phoneNumber: string,
  email: string,
  biharDistrict: string,
  referredBy: string,
  profileUrl: string,
  createdAt: string,
  status: string, points: string,
  countryCode: string, isRegistered: string, isMember: string, currentCountry: string, currentState: string,
): User => {
  const users = getUsers();

  // Generate a unique ID
  // const id = uuidv4();

  const newUser: User = {
    id,
    fullName,
    phoneNumber,
    email,
    biharDistrict,
    referredBy,
    profileUrl,
    createdAt: new Date().toISOString(),
    status: referredBy ? 'pending' : 'active',
    points: 0,
    countryCode,
    isRegistered,
    isMember,
    currentCountry,
    currentState
  };

  // Save the new user
  users.push(newUser);
  saveUsers(users);
  saveUsersDB(newUser);


  // If this is a referral, add points to the referrer
  if (referredBy) {
    addPointsToUser(referredBy, 10);
  }

  return newUser;
};

// Find a user by ID
export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

// Find a user by email
export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Get all referrals made by a user
export const getUserReferrals = (userId: string): User[] => {
  const users = getUsers();
  return users.filter(user => user.referredBy === userId);
};

// Get referral statistics for a user
export const getUserReferralStats = (userId: string): ReferralStats => {
  const referrals = getUserReferrals(userId);

  const totalCount = referrals.length;
  const pendingCount = referrals.filter(ref => ref.status === 'pending').length;
  const verifiedCount = referrals.filter(ref => ref.status === 'verified').length;

  const user = getUserById(userId);
  const totalPoints = user?.points || 0;

  return {
    totalCount,
    pendingCount,
    verifiedCount,
    totalPoints
  };
};

// Add points to a user
export const addPointsToUser = (userId: string, points: number): void => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].points = (users[userIndex].points || 0) + points;
    saveUsers(users);
  }
};

// Update referral status
export const updateReferralStatus = (userId: string, status: 'pending' | 'active' | 'verified'): void => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].status = status;

    // If status is verified, add extra points to the referrer
    if (status === 'verified' && users[userIndex].referredBy) {
      addPointsToUser(users[userIndex].referredBy, 15);
    }

    saveUsers(users);
  }
};