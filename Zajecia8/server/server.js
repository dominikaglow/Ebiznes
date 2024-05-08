const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect('mongodb://localhost:27017/users');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting do database:'));
db.once('open', () => {
    console.log('Connection established');
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.send('Loggin and registration server');
});

app.post('/register', async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            res.status(400).send('User already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username, 
            password: hashedPassword
        });
        await newUser.save();

        return res.status(201).send('User created');

    } catch (error) {
        console.error("Error creating new user: ", error);
        return res.status(500).send('Internal server error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid password');
        }

        return res.status(200).send('Login successful');
    } catch (error) {
        console.error("Error logging in: ", error);
        return res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

