class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy]

  def index
    # Recipe.select(:title).group(:title).having("COUNT(*) > 1").each do |recipe|
    #     duplicates = Recipe.where(title: recipe.title).order(:created_at)
    #     duplicates.offset(1).destroy_all # Залишає перший запис, видаляє інші
    #   end
    recipes = Recipe.all.order(created_at: :desc)

    if params[:ingredient].present? && params[:ingredient] != "All"
      ingredient = Ingredient.find_by(name: params[:ingredient])
      if ingredient
        recipes = recipes.where("ingredients @> ?", [ { db_id: ingredient.id } ].to_json)
      else
        recipes = Recipe.none # Якщо інгредієнт не знайдено, повертаємо пустий результат
      end
    end

    # Фільтрація за областю (area)
    if params[:area].present? && params[:area] != "All"
      recipes = recipes.where(area: params[:area])
    end

    # recipes = recipes.where(area: params[:area]) if params[:area].present?
    # if params[:ingredient].present?
    #   recipes = recipes.where(
    #     "ingredients @> ?::jsonb",
    #     [ { id: params[:ingredient].to_i } ].to_json
    #   )
    # end
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
    render json: @recipe
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
