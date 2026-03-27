const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Meal = require('./models/Meal');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Meal.deleteMany();

    // Hash password for admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });
    await adminUser.save();

    // Create sample meals
    const mealsData = [
      {
        day: 'Monday',
        breakfast: 'Idli, Sambar, Coconut Chutney, Tea/Coffee',
        lunch: 'Chicken Biryani, Raita, Salad, Pickle, Gulab Jamun',
        dinner: 'Roti, Paneer Butter Masala, Dhal, Green Salad, Dessert',
      },
      {
        day: 'Tuesday',
        breakfast: 'Poha, Onion, Peanut, Tea/Coffee',
        lunch: 'Fish Curry, Rice, Papad, Pickle, Fruit Salad',
        dinner: 'Naan, Chole Bhature, Yogurt, Cucumber Salad, Kheer',
      },
      {
        day: 'Wednesday',
        breakfast: 'Paratha, Curd, Pickle, Tea/Coffee',
        lunch: 'Mutton Keema, Basmati Rice, Salad, Papad, Ice Cream',
        dinner: 'Roti, Aloo Gobi, Dal Makhani, Green Salad, Custard',
      },
      {
        day: 'Thursday',
        breakfast: 'Dosa, Chutney, Sambar, Tea/Coffee',
        lunch: 'Shrimp Masala, Rice, Salad, Pickle, Brownie',
        dinner: 'Chapati, Chana Masala, Basmati Rice, Tomato Salad, Momos',
      },
      {
        day: 'Friday',
        breakfast: 'Upma, Vegetables, Chutney, Tea/Coffee',
        lunch: 'Mutton Pulao, Raita, Salad, Papad, Mango Lassi',
        dinner: 'Naan, Tandoori Chicken, Salad, Mint Chutney, Flan',
      },
    ];

    await Meal.insertMany(mealsData);

    console.log('Sample data added successfully');
    console.log('Admin user: admin@gmail.com / 123456');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();