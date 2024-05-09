const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');

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

const redirectUri = 'http://localhost:3000/auth/google/callback';

const googleClient = new OAuth2Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: redirectUri
});

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

app.get('/auth/google', async (req, res) => {
    const redirectUrl = googleClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    res.redirect(redirectUrl);
});

app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await googleClient.getToken(code);
        const ticket = await googleClient.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();

        const token = jwt.sign({ userId: payload.sub }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.redirect(`http://localhost:3001/login?token=${token}`);
    } catch (error) {
        console.error('Error authenticating with Google:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

