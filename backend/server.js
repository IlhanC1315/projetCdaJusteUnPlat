require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport'); 
require('./config/passport')(passport);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));

connectDB();

app.use('/api/recettes', require('./routes/recette.routes'));

app.get('/', (req, res) => {
    res.send("Bienvenue sur l'api de recettes");
});

app.listen(3000, () => {
    console.log("server backend démarré");
});