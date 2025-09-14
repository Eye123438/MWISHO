import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, Star, MapPin, ShoppingCart } from 'lucide-react';
import { supabase, Product, Category } from '../../lib/supabase';
import Layout from '../../components/Layout';

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
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
        .eq('type', 'marketplace');

      // Mock products with real images
      const mockProducts: Product[] = [
        {
          id: '1',
          seller_id: 'seller1',
          category_id: 'electronics',
          title: 'iPhone 15 Pro Max 256GB',
          description: 'Latest iPhone with titanium design, A17 Pro chip, and advanced camera system. Brand new, sealed box.',
          price: 150000,
          image_url: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
          stock: 5,
          status: 'active',
          service_type: 'product',
          rating: 4.8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          seller_id: 'seller2',
          category_id: 'electronics',
          title: 'MacBook Pro 14" M3 Chip',
          description: 'Powerful laptop for professionals. 16GB RAM, 512GB SSD, excellent for development and creative work.',
          price: 280000,
          image_url: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
          stock: 3,
          status: 'active',
          service_type: 'product',
          rating: 4.9,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          seller_id: 'seller3',
          category_id: 'fashion',
          title: 'Designer Evening Dress',
          description: 'Elegant black evening dress perfect for formal events. High-quality fabric and excellent craftsmanship.',
          price: 8500,
          image_url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
          stock: 2,
          status: 'active',
          service_type: 'product',
          rating: 4.6,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          seller_id: 'seller4',
          category_id: 'fashion',
          title: 'Men\'s Casual Sneakers',
          description: 'Comfortable and stylish sneakers perfect for daily wear. Premium materials and modern design.',
          price: 4500,
          image_url: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg',
          stock: 8,
          status: 'active',
          service_type: 'product',
          rating: 4.4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          seller_id: 'seller5',
          category_id: 'home',
          title: 'Modern Dining Table Set',
          description: 'Beautiful 6-seater dining table with chairs. Solid wood construction with modern finish.',
          price: 35000,
          image_url: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
          stock: 1,
          status: 'active',
          service_type: 'product',
          rating: 4.7,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          seller_id: 'seller6',
          category_id: 'beauty',
          title: 'Professional Skincare Set',
          description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Suitable for all skin types.',
          price: 6500,
          image_url: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg',
          stock: 10,
          status: 'active',
          service_type: 'product',
          rating: 4.5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '7',
          seller_id: 'seller7',
          category_id: 'sports',
          title: 'Professional Gym Equipment Set',
          description: 'Home gym setup with dumbbells, resistance bands, yoga mat, and exercise guide. Perfect for home workouts.',
          price: 15000,
          image_url: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
          stock: 4,
          status: 'active',
          service_type: 'product',
          rating: 4.8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '8',
          seller_id: 'seller8',
          category_id: 'books',
          title: 'Programming Books Collection',
          description: 'Collection of essential programming books including Python, JavaScript, and React. Great for developers.',
          price: 5500,
          image_url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
          stock: 6,
          status: 'active',
          service_type: 'product',
          rating: 4.3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ] as Product[];

      setCategories(categoriesData || []);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleAddToCart = (product: Product) => {
    // Mock add to cart functionality
    alert(`Added ${product.title} to cart!`);
  };

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-2">Discover amazing products from trusted sellers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Only {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3 min-h-[4.5rem]">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-red-600">
                      KES {product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Marketplace;