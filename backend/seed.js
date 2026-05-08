// backend/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/user');

const admins = [
  {
    username: 'Delhi Admin',
    email: 'delhi.admin@samasya.com',
    password: 'admin123',
    role: 'admin',
    state: 'Delhi',
    city: 'Delhi',
  },
  {
    username: 'Haryana Admin',
    email: 'haryana.admin@samasya.com',
    password: 'admin123',
    role: 'admin',
    state: 'Haryana',
    city: 'Faridabad',
  },
  {
    username: 'Mumbai Admin',
    email: 'mumbai.admin@samasya.com',
    password: 'admin123',
    role: 'admin',
    state: 'Maharashtra',
    city: 'Mumbai',
  },
  {
    username: 'Bangalore Admin',
    email: 'bangalore.admin@samasya.com',
    password: 'admin123',
    role: 'admin',
    state: 'Karnataka',
    city: 'Bangalore',
  },
  {
    username: 'UP Admin',
    email: 'up.admin@samasya.com',
    password: 'admin123',
    role: 'admin',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
  },
];

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    for (const admin of admins) {
      const exists = await User.findOne({ email: admin.email });
      if (exists) {
        console.log(`Already exists: ${admin.email}`);
        continue;
      }

      // Password hash karo
      const hashPassword = await bcrypt.hash(admin.password, 10);

      await User.create({
        ...admin,
        password: hashPassword,
      });

      console.log(`✅ Admin created: ${admin.email}`);
    }

    console.log('Seeding complete!');
    process.exit(0);

  } catch (error) {
    console.log('Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmins();