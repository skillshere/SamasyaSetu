const express  = require('express')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db');
const userRoutes = require('./routes/userAuth');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoute');
const profileRoutes = require('./routes/profileRoute');
const cookieParser = require('cookie-parser')
const path = require('path');

dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
  res.send('SamasyaSetu Backend is running! 🚀')
})
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/issue',issueRoutes);
app.use('/api/profile',profileRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});
