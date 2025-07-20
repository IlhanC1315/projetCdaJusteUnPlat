const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const Recette = require('./models/recette');

async function importRecette() {
    try {
        await connectDB();
        console.log('connecter a la base de donnée')
        const filePath = path.join(__dirname, 'recette.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const recettes = JSON.parse(data)
        await Recette.insertMany(recettes)
        console.log('Importation reussi')
    } catch (err) {
        console.error("Erreur d'importation :", err.message)
    } finally {
        process.exit(0);
    }
}

importRecette();