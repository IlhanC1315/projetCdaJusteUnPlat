const recipeService = require('../services/recipeService');

exports.createRecipe = async (req, res) => {
    try {
        const recipe = await recipeService.createRecipe(req.body)
        res.status(201).json(recipe)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.createManyRecipe = async (req, res) => {
    try {
        const recipes = await recipeService.createManyRecipe(req.body)
        res.status(201).json(recipes)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.createPrepEtape = async (req, res) => {
    try {
        const prepEtape = await recipeService.createPrepEtape(req.body)
        res.status(201).json(prepEtape)
    } catch (err) {
        res.status(201).json({ message: err.message })
    }
};

exports.createIngredient = async (req, res) => {
    try {
        const ingredient = await recipeService.createIngredient(req.body)
        res.status(201).json(ingredient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.createIngredientEtape = async (req, res) => {
    try {
        const ingredientEtape = await recipeService.createIngredientEtape(req.body)
        res.status(201).json(ingredientEtape)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
};

exports.getAllRecipe = async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipe();
        res.status(201).json(recipes)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await recipeService.findRecipeById(req.params.id);
        if(!recipe) {
            return res.status(404).json({ message: 'Recette introuvable' });
        }
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

exports.getRecipeByName = async (req, res) => {
    try {
        const recipe = await recipeService.findRecipeByName(req.params.name);
        if(!recipe) {
            return res.status(404).json({ message: 'Recette introuvable' });
        }
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

exports.getRecipesPaginated = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const recipes = await recipeService.getRecipesPaginated(
            parseInt(page) || 1,
            parseInt(limit) || 10
        )
        res.status(201).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

exports.getRecipesByUser = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const recipes = await recipeService.getRecipeByUser(
            req.params.userId,
            parseInt(page) || 1,
            parseInt(limit) || 10
        );
        res.status(201).json(recipes)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

exports.getRecipesByFiltres = async (req, res) => {
    try {
        const { page, limit, ...filtres } = req.query;
        const recipes = await recipeService.getRecipesByFilters(
            filtres,
            parseInt(page) || 1,
            parseInt(limit) || 10
        );
        res.status(201).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRecipesByTotalTime = async (req, res) => {
    try {
        const { maxTotalTime, page, limit } = req.query;
        if(!maxTotalTime) {
            return res.status(400).json({ message: 'Le parametre maxTotalTime est requis'});
        }

        const recipes = await recipeService.getRecipesByTotalTime(
            parseInt(maxTotalTime),
            parseInt(page) || 1,
            parseInt(limit) || 10
        );
        res.status(201).json(recipes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

exports.updateRecipeById = async (req, res) => {
    try {
        const updated = await recipeService.updateRecipeById(req.params.id, req.body);
        if(!updated) {
            return res.status(404).json({ message: 'Recette introuvable'})
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
};

exports.updateRecipeByName = async (req, res) => {
    try {
        const updated = await recipeService.updateRecipeByName(req.params.name, req.body);
         if(!updated) {
            return res.status(404).json({ message: 'Recette introuvable'})
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateManyRecipe = async (req, res) => {
     try {
        const { ids, data } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Le champ 'ids' doit être un tableau non vide" });
        }

        if (!data || typeof data !== "object") {
            return res.status(400).json({ message: "Le champ 'data' doit contenir les modifications à appliquer" });
        }

        // Mise à jour en masse
        const result = await recipeService.updateManyRecipe(ids, data);

        // Récupération des recettes mises à jour
        const updatedRecipes = await Recipe.find({ _id: { $in: ids } });

        res.status(200).json({
            message: `${result.modifiedCount} recette(s) mise(s) à jour`,
            updatedRecipes
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.patchRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour" });
        }

        const updatedRecipe = await recipeService.patchRecipe(id, updates);

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePrepEtape = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour" });
    }

    const updatedPrepEtape = await recipeService.updatePrepEtape(id, updates);
    if (!updatedPrepEtape) {
      return res.status(404).json({ message: "Préparation étape non trouvée" });
    }

    res.status(200).json(updatedPrepEtape);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour" });
    }

    const updatedIngredient = await recipeService.updateIngredient(id, updates);
    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingrédient non trouvé" });
    }

    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIngredientEtape = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour" });
    }

    const updatedIngredientEtape = await recipeService.updateIngredientEtape(id, updates);
    if (!updatedIngredientEtape) {
      return res.status(404).json({ message: "Étape ingrédient non trouvée" });
    }

    res.status(200).json(updatedIngredientEtape);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


