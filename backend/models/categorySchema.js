const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        enum: [
            'Entrées',
            'Plat principale',
            'Accompagnements',
            'Déssert',
            'Snack / Fast-Food',
            'Soupe et Veloutes',
            'Salade',
            'Petit dej / Brunch',
            'Apéritif',
            'Boisson',
            'Sauce',
            'Pays'
        ],
        required: true,
    }
})

module.exports = mongoose.model('Categorys', categorySchema)
