class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy]

  def index
    # Recipe.select(:title).group(:title).having("COUNT(*) > 1").each do |recipe|
    #     duplicates = Recipe.where(title: recipe.title).order(:created_at)
    #     duplicates.offset(1).destroy_all # Залишає перший запис, видаляє інші
    #   end
    recipes = Recipe.all.order(created_at: :desc)

     if params[:category].present? && params[:category] != "All"
      recipes = recipes.where(category: params[:category])
     end

     if params[:area].present? && params[:area] != "All"
      recipes = recipes.where(area: params[:area])
     end

     if params[:ingredient].present? && params[:ingredient] != "All"
      ingredient = Ingredient.find_by(name: params[:ingredient])
      if ingredient
        recipes = recipes.where(
           "EXISTS (SELECT 1 FROM jsonb_array_elements(ingredients) AS ingredient_item WHERE ingredient_item->>'id' = ?)",
           ingredient.db_id
          )
      else
        recipes = Recipe.none # Якщо інгредієнт не знайдено, повертаємо пустий результат
      end
     end

    render json: recipes
  end

  def create
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
    expanded_ingredients = @recipe.ingredients.map do |ingredient|
      ingredient_data = Ingredient.find_by(db_id: ingredient["id"])
      if ingredient_data
        ingredient.merge(
          "name" => ingredient_data.name,
          "description" => ingredient_data.description,
          "image" => ingredient_data.image
        )
      else
        ingredient # Якщо інгредієнт не знайдено, повертаємо без змін
      end
    end
     render json: {
      recipe: @recipe,
      expanded_ingredients: expanded_ingredients
     }
  end

  def destroy
    @recipe&.destroy
    render json: { message: "Recipe deleted!" }
  end

  private

  def recipe_params
    params.permit(:title, :category, :area, :instructions, :description, :thumb, :time, :ingredients)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end
end
