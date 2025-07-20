const Recette = require('../models/recette')

//cette fonction me permet d'obtenir toutes les recettes
exports.getAllRecipe = async (req, res) => {
    try {
        const recettes = await Recette.find();
        res.json(recettes);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const recette = new Recette(req.body);
        await recette.save();
        res.status(201).json(recette)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.uptdateRecipe = async (req, res) => {
    try {
        const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!recette) return res.status(404).json('Non trouvé')
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recette = await Recette.findByIdAndDelete(req.params.id)
        if (!recette) return res.status(404).json('Non trouvé')
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};
