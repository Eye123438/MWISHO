import React, { useEffect, useState } from 'react';
import { Search, ShoppingBag, Car, Briefcase, MapPin, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, Product, Category } from '../../lib/supabase';
import Layout from '../../components/Layout';

const CustomerDashboard: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .limit(8);

      // Create mock featured products with real images
      const mockProducts: Product[] = [
        {
          id: '1',
          seller_id: 'mock-seller',
          category_id: 'electronics',
          title: 'iPhone 15 Pro Max',
          description: 'Latest iPhone with advanced features',
          price: 150000,
          image_url: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
          stock: 5,
          status: 'active',
          service_type: 'product',
          rating: 4.8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Product,
        {
          id: '2',
          seller_id: 'mock-seller',
          category_id: 'fashion',
          title: 'Designer Dress',
          description: 'Elegant evening dress',
          price: 8500,
          image_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
          stock: 3,
          status: 'active',
          service_type: 'product',
          rating: 4.6,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Product,
        {
          id: '3',
          seller_id: 'mock-seller',
          category_id: 'services',
          title: 'Professional Hair Styling',
          description: 'Expert hair styling services',
          price: 2500,
          image_url: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
          stock: 0,
          status: 'active',
          service_type: 'service',
          location: 'Westlands, Nairobi',
          rating: 4.9,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Product,
        {
          id: '4',
          seller_id: 'mock-seller',
          category_id: 'properties',
          title: 'Modern Apartment',
          description: '2-bedroom apartment in prime location',
          price: 85000,
          image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          stock: 0,
          status: 'active',
          service_type: 'property',
          location: 'Kilimani, Nairobi',
          rating: 4.7,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Product
      ];

      setCategories(categoriesData || []);
      setFeaturedProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickServices = [
    { icon: ShoppingBag, title: 'Marketplace', subtitle: 'Shop products', color: 'from-blue-500 to-blue-600', to: '/customer/marketplace' },
    { icon: Car, title: 'Book Ride', subtitle: 'Quick transport', color: 'from-green-500 to-green-600', to: '/customer/rides' },
    { icon: Briefcase, title: 'Services', subtitle: 'Find services', color: 'from-purple-500 to-purple-600', to: '/customer/services' },
    { icon: MapPin, title: 'Errands', subtitle: 'Task help', color: 'from-orange-500 to-orange-600', to: '/customer/services' }
  ];

  if (loading) {
    return (
      <Layout requiredRole="customer">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requiredRole="customer">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to Quicklink Service!</h1>
          <p className="text-red-100 mb-6">Your one-stop solution for shopping, rides, and services</p>
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Quick Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to={service.to}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-200 group-hover:-translate-y-1">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.subtitle}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products & Services</h2>
            <Link 
              to="/customer/marketplace"
              className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>
                  {product.service_type === 'service' && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Service
                    </span>
                  )}
                  {product.service_type === 'property' && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Property
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  {product.location && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{product.location}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-red-600">
                        KES {product.price.toLocaleString()}
                        {product.service_type === 'property' && <span className="text-sm text-gray-500">/month</span>}
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                      {product.service_type === 'service' ? 'Book' : product.service_type === 'property' ? 'View' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/customer/marketplace?category=${category.id}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{category.type}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CustomerDashboard;