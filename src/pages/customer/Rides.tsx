import React, { useState } from 'react';
import { MapPin, Clock, Car, Bike, User, CreditCard } from 'lucide-react';
import Layout from '../../components/Layout';

const Rides: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<'car' | 'bike' | 'motorbike'>('car');
  const [bookingStep, setBookingStep] = useState<'select' | 'booking' | 'waiting' | 'matched'>('select');
  const [selectedPayment, setSelectedPayment] = useState<'till' | 'paybill' | 'card'>('till');

  const vehicleTypes = [
    {
      type: 'car' as const,
      name: 'Car',
      icon: Car,
      description: '4 seats, comfortable ride',
      estimatedFare: 350,
      estimatedTime: '5-8 mins'
    },
    {
      type: 'bike' as const,
      name: 'Bike',
      icon: Bike,
      description: 'Eco-friendly, fast in traffic',
      estimatedFare: 180,
      estimatedTime: '3-5 mins'
    },
    {
      type: 'motorbike' as const,
      name: 'Motorbike',
      icon: User,
      description: 'Quick and efficient',
      estimatedFare: 220,
      estimatedTime: '4-6 mins'
    }
  ];

  const paymentMethods = [
    { type: 'till' as const, name: 'Till Number', description: 'Pay to till 174379' },
    { type: 'paybill' as const, name: 'Paybill', description: 'Business no. 522522' },
    { type: 'card' as const, name: 'Card Payment', description: 'Credit/Debit card' }
  ];

  const handleBookRide = () => {
    if (!pickup || !dropoff) {
      alert('Please enter both pickup and dropoff locations');
      return;
    }
    setBookingStep('booking');
    
    // Simulate booking process
    setTimeout(() => {
      setBookingStep('waiting');
      
      // Simulate finding driver
      setTimeout(() => {
        setBookingStep('matched');
      }, 3000);
    }, 1000);
  };

  const selectedVehicleInfo = vehicleTypes.find(v => v.type === selectedVehicle);

  if (bookingStep === 'waiting') {
    return (
      <Layout requiredRole="customer">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finding Your Driver...</h2>
            <p className="text-gray-600 mb-6">We're matching you with the nearest available driver</p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">From: {pickup}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">To: {dropoff}</span>
              </div>
            </div>
            <button
              onClick={() => setBookingStep('select')}
              className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (bookingStep === 'matched') {
    return (
      <Layout requiredRole="customer">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Driver Found!</h2>
              <p className="text-gray-600">Your driver is on the way</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Kamau</div>
                  <div className="text-sm text-gray-600">KCA 123X • White Toyota</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-600">4.9 (127 trips)</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">mins away</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{selectedVehicleInfo?.estimatedFare}</div>
                  <div className="text-sm text-gray-600">KES</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">{pickup}</span>
              </div>
              <div className="ml-6 border-l-2 border-dashed border-gray-300 h-4"></div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700">{dropoff}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                Call Driver
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                Cancel Trip
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requiredRole="customer">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book a Ride</h1>
          <p className="text-gray-600 mt-2">Quick and reliable transportation</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Location Inputs */}
          <div className="space-y-4 mb-8">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <input
                type="text"
                placeholder="Pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
              <input
                type="text"
                placeholder="Where to?"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg"
              />
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Vehicle Type</h3>
            <div className="space-y-3">
              {vehicleTypes.map((vehicle) => {
                const Icon = vehicle.icon;
                return (
                  <button
                    key={vehicle.type}
                    onClick={() => setSelectedVehicle(vehicle.type)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedVehicle === vehicle.type
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${
                          selectedVehicle === vehicle.type ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            selectedVehicle === vehicle.type ? 'text-red-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">{vehicle.name}</div>
                          <div className="text-sm text-gray-600">{vehicle.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">KES {vehicle.estimatedFare}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {vehicle.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.type}
                  onClick={() => setSelectedPayment(method.type)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedPayment === method.type
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <CreditCard className={`w-6 h-6 ${
                        selectedPayment === method.type ? 'text-red-600' : 'text-gray-600'
                      }`} />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookRide}
            disabled={!pickup || !dropoff || bookingStep !== 'select'}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200"
          >
            {bookingStep === 'booking' ? 'Booking...' : `Book ${selectedVehicleInfo?.name} - KES ${selectedVehicleInfo?.estimatedFare}`}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Rides;