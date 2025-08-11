const Recipe = require('../models/recette');
const PrepEtape = require('../models/prepEtapeSchema');
const Ingredient = require('../models/ingredientSchema');
const IngredientEtape = require('../models/ingredientEtapeSchema');

//METHODE POST 

exports.createRecipe = async (data) => {
    const recipe = new Recipe(data)
    return await recipe.save();
};

exports.createManyRecipe = async (datas) => {
    return await Recipe.insertMany(datas);
};

exports.createPrepEtape = async (data) => {
    const prepEtape = new PrepEtape(data);
    return await prepEtape.save();
};

exports.createIngredient = async (data) => {
    const ingredient = new Ingredient(data)
    return await ingredient.save();
};

exports.createIngredientEtape = async (data) => {
    const ingredientEtape = new IngredientEtape(data)
    return await ingredientEtape.save();
};

//METHODE GET

exports.getAllRecipe = async () => {
    return await Recipe.find()
        .populate('difficulty estimated_cost occasion season mainIngredient cookingMethod required_tools ingredientEtapes prepEtape nutritionValues category diet origin userCreated')
        .sort({ createdAt: -1 });
};

exports.findRecipeById = async (id) => {
    const recipe = await Recipe.findById(id)
        .populate('difficulty estimated_cost occasion season mainIngredient cookingMethod required_tools ingredientEtapes prepEtape nutritionValues category diet origin userCreated')
    return recipe;
};

exports.findRecipeByName = async (name) => {
    const recipe = await Recipe.findOne({ recipeName: name })
    if(!recipe) throw new Error('Recette introuvable')
    return recipe
};

exports.getRecipesPaginated = async (page, limit) => {
    const skip = (page - 1) * limit;
    return await Recipe.find()
        .populate('difficulty estimated_cost occasion season mainIngredient cookingMethod required_tools ingredientEtapes prepEtape nutritionValues category diet origin userCreated')
        .sort({ createdAt: -1 }) // les plus récentes d'abord
        .skip(skip)
        .limit(limit);
};

exports.getRecipeByUser = async(userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Recipe.find({ userCreated: userId })
        .populate('difficulty estimated_cost occasion season mainIngredient cookingMethod required_tools ingredientEtapes prepEtape nutritionValues category diet origin userCreated')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};

exports.getRecipesByFilters = async (filters = {}, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    return await Recipe.find(filters)
        .populate('difficulty estimated_cost occasion season mainIngredient cookingMethod required_tools ingredientEtapes prepEtape nutritionValues category diet origin userCreated')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
};

exports.getRecipesByTotalTime = async (maxTotalTime, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    return await Recipe.aggregate([
        {
            $addFields: {
                total_time: { $add: ["$prep_time", "$cook_time"] }
            }
        },
        {
            $match: {
                total_time: { $lte: maxTotalTime }
            }
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
    ]);
};

//METHODE PUT

exports.updateRecipeById = async (id, data) => {
    return await Recipe.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

exports.updateRecipeByName = async (name, data) => {
    return await Recipe.findOneAndUpdate({ recipeName: name }, data, { new: true, runValidators: true });
};

exports.updateManyRecipe = async (ids, datas) => {
    const manyRecipe = await Recipe.updateMany({ _id: { $in: ids } }, datas, { new: true, runValidators: true});
};

exports.patchRecipe = async (id, updates) => {
    return await Recipe.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true});
};

exports.updatePrepEtape = async (id, updates) => {
    return await PrepEtape.findByIdAndUpdate(id, updates, { new: true, runValidators: true});
};

exports.updateIngredient = async (id, updates) => {
    return await Ingredient.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

exports.updateIngredientEtape = async (id, updates) => {
    return await IngredientEtape.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

//METHODE PATCH

exports.addPrepEtapeToRecipe = async (recipeId, prepEtapeId) => {
    return await Recipe.findByIdAndUpdate(recipeId, { $push: { prepEtape: prepEtapeId } }, { new: true, runValidators: true });
};

exports.addIngredientEtapeToRecipe = async (recipeId, ingredientEtapeId) => {
    return await Recipe.findByIdAndUpdate(recipeId, { $push: {ingredientEtapes: ingredientEtapeId} }, { new: true, runValidators: true });
};

//METHODE DELETE

exports.deleteRecipe = async (id) => {
    return await Recipe.findByIdAndDelete(id);
};

exports.deleteRecipeAllData = async (recipeId) => {
    // 1 trouver la recette 
    const recipe = await Recipe.findById(recipeId)
    if(!recipe) {
        throw new Error('Recette non trouvée')
    }

    // 2 supprimer toutes les prepEtape liées
    if(recipe.prepEtape && recipe.prepEtape.length > 0) {
        await PrepEtape.deleteMany({ _id: { $in: recipe.prepEtape } });
    }

    // 3 supprimer toutes les ingredientEtape + leur ingredient
    if(recipe.ingredientEtapes && recipe.ingredientEtapes.length > 0) {
        //recuperer les ingredientsEtapes
        const ingredientEtapes = await IngredientEtape.find({ _id: { $in: recipe.ingredientEtapes } })
        //recuperer tous les ingredients liés
        const allIngredientIds = ingredientEtapes.reduce((acc, etape) => {
            return acc.concat(etape.ingredient);
        }, []);
        //supprimer les ingredients
        if(allIngredientIds.length > 0) {
            await Ingredient.deleteMany({ _id: { $in: allIngredientIds } });
        }
        //supprimer les ingredientEtape
        await IngredientEtape.deleteMany({ _id: { $in: recipe.ingredientEtapes } });
    }
    await Recipe.findByIdAndDelete(recipeId);
    return { message: 'Recette et données liées supprimées avec succès'};
};

exports.deletePrepEtape = async (id) => {
    return await PrepEtape.findByIdAndDelete(id);
};

exports.deleteIngredient = async (id) => {
    return await Ingredient.findByIdAndDelete(id);
};

exports.deleteIngredientEtape = async (id) => {
    return await IngredientEtape.findByIdAndDelete(id);
};

exports.removePrepEtapeFromRecipe = async (recipeId, prepEtapeId) => {
    return await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { prepEtape: prepEtapeId } },
        { new: true }
    );
};

exports.removeIngredientEtapeFromRecipe = async (recipeId, ingredientEtapeId) => {
    return await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { ingredientEtapes: ingredientEtapeId } },
        { new: true }
    );
};








