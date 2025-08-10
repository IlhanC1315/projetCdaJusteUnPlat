const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const app = express();
const passport = require('./config/passport');
require('./config/passport')(passport);
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('api/auth', require('./routes/auth.routes'));

connectDB();

app.use('/api/recettes', require('./routes/recette.routes'));

app.get('/', (req, res) => {
    res.send("Bienvenue sur l'api de recettes")
})

app.listen(3000, () => {
    console.log("server backend démarré")
})

const fs = require('fs')

const data = fs.readFileSync('./recettess.json', 'utf-8')
console.log(data.recette.length)