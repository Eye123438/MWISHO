import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, CreditCard, ToggleLeft, ToggleRight, Navigation } from 'lucide-react';
import { supabase, Ride } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';

interface DriverStats {
  totalRides: number;
  todayRides: number;
  totalEarnings: number;
  todayEarnings: number;
  rating: number;
}

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [stats, setStats] = useState<DriverStats>({
    totalRides: 0,
    todayRides: 0,
    totalEarnings: 0,
    todayEarnings: 0,
    rating: 0
  });
  const [activeRides, setActiveRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Mock data for driver dashboard
      const mockActiveRides: Ride[] = [
        {
          id: '1',
          customer_id: 'customer1',
          driver_id: user!.id,
          pickup_location: 'Westlands, Nairobi',
          dropoff_location: 'KICC, Nairobi',
          ride_type: 'car',
          fare: 350,
          status: 'accepted',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          customer: {
            id: 'customer1',
            full_name: 'Jane Doe',
            phone_number: '+254712345678'
          }
        } as Ride,
        {
          id: '2',
          customer_id: 'customer2',
          driver_id: user!.id,
          pickup_location: 'Karen, Nairobi',
          dropoff_location: 'Sarit Centre',
          ride_type: 'car',
          fare: 280,
          status: 'in_progress',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          customer: {
            id: 'customer2',
            full_name: 'John Smith',
            phone_number: '+254723456789'
          }
        } as Ride
      ];

      setActiveRides(mockActiveRides);
      setStats({
        totalRides: 247,
        todayRides: 8,
        totalEarnings: 125400,
        todayEarnings: 2800,
        rating: 4.8
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    // In real app, this would update the driver's status in the database
  };

  const handleAcceptRide = (rideId: string) => {
    // Mock accepting ride
    alert(`Ride ${rideId} accepted!`);
  };

  const handleRejectRide = (rideId: string) => {
    // Mock rejecting ride
    setActiveRides(rides => rides.filter(ride => ride.id !== rideId));
  };

  const statCards = [
    {
      title: 'Total Rides',
      value: stats.totalRides.toLocaleString(),
      subtitle: `${stats.todayRides} today`,
      icon: Car,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Earnings',
      value: `KES ${stats.totalEarnings.toLocaleString()}`,
      subtitle: `KES ${stats.todayEarnings} today`,
      icon: CreditCard,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Average Rating',
      value: stats.rating.toFixed(1),
      subtitle: 'Keep it up!',
      icon: MapPin,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Online Time',
      value: '6.5h',
      subtitle: 'Today',
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <Layout requiredRole="driver">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requiredRole="driver">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your rides and track earnings</p>
          </div>
          
          {/* Online Status Toggle */}
          <div className="flex items-center space-x-3">
            <span className={`font-medium ${isOnline ? 'text-green-600' : 'text-gray-600'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              onClick={handleToggleOnline}
              className="focus:outline-none"
            >
              {isOnline ? (
                <ToggleRight className="w-10 h-10 text-green-600" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`rounded-xl p-6 ${
          isOnline 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {isOnline ? "You're online and ready for rides!" : "You're offline"}
              </h3>
              <p className={isOnline ? 'text-green-100' : 'text-gray-500'}>
                {isOnline 
                  ? 'Customers can see you and request rides' 
                  : 'Go online to start receiving ride requests'
                }
              </p>
            </div>
            <Navigation className={`w-12 h-12 ${isOnline ? 'text-white' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Rides */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Rides</h2>
          
          {activeRides.length === 0 ? (
            <div className="text-center py-12">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No active rides</h3>
              <p className="text-gray-600">
                {isOnline ? 'Waiting for ride requests...' : 'Go online to receive ride requests'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeRides.map((ride) => (
                <div key={ride.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ride.status === 'accepted' 
                            ? 'bg-blue-100 text-blue-800'
                            : ride.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ride.status === 'accepted' ? 'Accepted' : 
                           ride.status === 'in_progress' ? 'In Progress' : 
                           'Pending'}
                        </span>
                        <span className="text-sm text-gray-600">
                          Ride #{ride.id.slice(-6)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">{ride.pickup_location}</span>
                        </div>
                        <div className="ml-2 border-l-2 border-dashed border-gray-300 h-4"></div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700">{ride.dropoff_location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>👤 {ride.customer?.full_name}</span>
                        <span>📱 {ride.customer?.phone_number}</span>
                        <span className="font-semibold text-green-600">KES {ride.fare}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {ride.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptRide(ride.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                        >
                          Accept Ride
                        </button>
                        <button
                          onClick={() => handleRejectRide(ride.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {ride.status === 'accepted' && (
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                        Start Trip
                      </button>
                    )}
                    {ride.status === 'in_progress' && (
                      <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                        Complete Trip
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DriverDashboard;