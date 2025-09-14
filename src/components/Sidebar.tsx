import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingCart, 
  Car, 
  Briefcase, 
  Users, 
  Package, 
  BarChart3,
  Settings,
  MapPin,
  CreditCard,
  UserCheck,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { profile } = useAuth();

  const getMenuItems = () => {
    switch (profile?.role) {
      case 'admin':
        return [
          { to: '/admin', icon: Home, label: 'Dashboard' },
          { to: '/admin/users', icon: Users, label: 'Users' },
          { to: '/admin/products', icon: Package, label: 'Products' },
          { to: '/admin/rides', icon: Car, label: 'Rides' },
          { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
          { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
          { to: '/admin/employees', icon: UserCheck, label: 'Employees' },
          { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/admin/settings', icon: Settings, label: 'Settings' }
        ];
      case 'seller':
        return [
          { to: '/seller', icon: Home, label: 'Dashboard' },
          { to: '/seller/products', icon: Package, label: 'My Products' },
          { to: '/seller/orders', icon: ShoppingCart, label: 'Orders' },
          { to: '/seller/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/seller/add-product', icon: Plus, label: 'Add Product' }
        ];
      case 'driver':
        return [
          { to: '/driver', icon: Home, label: 'Dashboard' },
          { to: '/driver/rides', icon: Car, label: 'My Rides' },
          { to: '/driver/earnings', icon: CreditCard, label: 'Earnings' },
          { to: '/driver/location', icon: MapPin, label: 'Go Online' }
        ];
      case 'customer':
        return [
          { to: '/customer', icon: Home, label: 'Home' },
          { to: '/customer/marketplace', icon: ShoppingCart, label: 'Marketplace' },
          { to: '/customer/rides', icon: Car, label: 'Rides' },
          { to: '/customer/services', icon: Briefcase, label: 'Services' },
          { to: '/customer/orders', icon: Package, label: 'My Orders' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-30">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;