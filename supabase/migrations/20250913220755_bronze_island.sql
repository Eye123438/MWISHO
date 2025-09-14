/*
  # Seed Data for Quicklink Service

  Populate initial categories and sample data for testing
*/

-- Insert Categories
INSERT INTO categories (name, type, icon) VALUES
  ('Electronics', 'marketplace', '📱'),
  ('Fashion', 'marketplace', '👕'),
  ('Home & Living', 'marketplace', '🏠'),
  ('Books & Media', 'marketplace', '📚'),
  ('Sports & Fitness', 'marketplace', '⚽'),
  ('Beauty & Health', 'marketplace', '💄'),
  
  ('Hair Salon', 'services', '💇‍♀️'),
  ('Barber Shop', 'services', '💇‍♂️'),
  ('Nail Parlor', 'services', '💅'),
  ('Spa & Wellness', 'services', '🧖‍♀️'),
  ('Tech Services', 'services', '💻'),
  ('Cleaning Services', 'services', '🧹'),
  
  ('Grocery Shopping', 'errands', '🛒'),
  ('Package Delivery', 'errands', '📦'),
  ('Document Services', 'errands', '📄'),
  ('Pet Services', 'errands', '🐕'),
  
  ('Residential', 'properties', '🏡'),
  ('Commercial', 'properties', '🏢'),
  ('Land', 'properties', '🌾'),
  ('Rental', 'properties', '🏠');

-- Note: User profiles and products will be created through the application
-- when users register and sellers add their products