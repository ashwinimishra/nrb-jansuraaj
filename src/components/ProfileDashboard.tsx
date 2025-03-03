import React, { useState, useEffect } from 'react';
import { User, ReferralStats } from '../types';
import { getUserReferrals, getUserReferralStats, updateReferralStatus } from '../utils/storage';
import {
  Users,
  Award,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import ReferralForm from './ReferralForm';

interface ProfileDashboardProps {
  user: User;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ user }) => {
  const [referrals, setReferrals] = useState<User[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalCount: 0,
    pendingCount: 0,
    verifiedCount: 0,
    totalPoints: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Load referrals and stats
    const loadReferrals = () => {
      const allReferrals = getUserReferrals(user.id);
      setReferrals(allReferrals);

      // Sort by date (newest first)
      allReferrals.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Calculate total pages
      setTotalPages(Math.max(1, Math.ceil(allReferrals.length / itemsPerPage)));

      // Get stats
      const userStats = getUserReferralStats(user.id);
      setStats(userStats);
    };

    loadReferrals();
  }, [user.id]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return referrals.slice(startIndex, endIndex);
  };

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Active
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-indigo-600 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Your Referral Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <div className="bg-indigo-50 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-indigo-600">Total Referrals</p>
            <p className="text-2xl font-bold text-indigo-900">{stats.totalCount}</p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-yellow-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-900">{stats.pendingCount}</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-green-600">Verified</p>
            <p className="text-2xl font-bold text-green-900">{stats.verifiedCount}</p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-purple-600">Total Points</p>
            <p className="text-2xl font-bold text-purple-900">{stats.totalPoints}</p>
          </div>
        </div>
      </div>

      {/* Referral Progress */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BarChart3 className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">Referral Progress</h3>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{ width: `${Math.min(100, (stats.totalCount / 10) * 100)}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600">
            {stats.totalCount} out of 10 referrals completed
            {stats.totalCount >= 10 && " - You've reached Silver tier!"}
          </p>
        </div>
      </div>

      {/* Referrals List */}
      <div className="px-6 pb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Your Referrals</h3>
        <ReferralForm userId={user.id} />
        {referrals.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">You haven't made any referrals yet.</p>
            <p className="text-gray-500 text-sm mt-1">Refer friends to earn points and rewards!</p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getCurrentPageItems().map((referral) => (
                    <tr key={referral.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-700 font-medium">
                              {referral.fullName.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{referral.fullName}</div>
                            <div className="text-sm text-gray-500">{referral.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(referral.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(referral.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {referral.status === 'verified' ? '+25' : '+10'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-4 rounded-lg">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, referrals.length)}
                      </span>{' '}
                      of <span className="font-medium">{referrals.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border ${currentPage === index + 1
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            } text-sm font-medium`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Rewards Information */}
      <div className="px-6 pb-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Referral Rewards
          </h3>
          <p className="text-sm opacity-90 mb-4">
            Earn points for each successful referral and unlock exclusive benefits!
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <span className="font-bold">10</span>
              </div>
              <div>
                <p className="font-medium">Points for each referral</p>
                <p className="text-xs opacity-80">When a friend registers using your referral</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <span className="font-bold">15</span>
              </div>
              <div>
                <p className="font-medium">Bonus points for verified referrals</p>
                <p className="text-xs opacity-80">When your referral completes verification</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <span className="font-bold">50</span>
              </div>
              <div>
                <p className="font-medium">Silver Tier</p>
                <p className="text-xs opacity-80">Reach 5 verified referrals to unlock</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <span className="font-bold">100</span>
              </div>
              <div>
                <p className="font-medium">Gold Tier</p>
                <p className="text-xs opacity-80">Reach 10 verified referrals to unlock</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;