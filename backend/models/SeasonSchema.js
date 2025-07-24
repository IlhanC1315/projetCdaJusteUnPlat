const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: [
            'Printemps',
            'Eté',
            'Automne',
            'Hiver',
            'Toutes saisons'
        ],
    }
})

module.exports = mongoose.model('Season', SeasonSchema)