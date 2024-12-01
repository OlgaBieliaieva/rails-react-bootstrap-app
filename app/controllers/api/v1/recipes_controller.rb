class Api::V1::RecipesController < ApplicationController
  include Rails.application.routes.url_helpers
  before_action :set_recipe, only: %i[show destroy]
  skip_before_action :verify_authenticity_token, only: [ :create ]


  def index
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
      ingredients = JSON.parse(params[:ingredients]) rescue []

      updated_ingredients = ingredients.map do |ingredient|
        next if ingredient["name"].blank?

        ingredient_record = Ingredient.find_by(name: ingredient["name"])
        if ingredient_record
          { id: ingredient_record.db_id, measure: ingredient["measure"] }
        else
          Rails.logger.warn "Ingredient not found: #{ingredient['name']}"
          nil
        end
      end.compact

      thumb_url = nil
      Rails.logger.info "Thumb parameter: #{params[:thumb].inspect}"
      if params[:thumb].present?
        begin
          temp_file = params[:thumb].tempfile
          cloudinary_response = Cloudinary::Uploader.upload(temp_file.path, folder: "recipes")
          thumb_url = cloudinary_response["secure_url"]
        rescue StandardError => e
          Rails.logger.error "Cloudinary upload error: #{e.message}"
          render json: { error: "Failed to upload image" }, status: :unprocessable_entity
          return
        end
      end

     recipe = Recipe.new(recipe_params)
     recipe.ingredients = updated_ingredients
     recipe.thumb = thumb_url

     if recipe.save
        render json: {
        message: "Recipe created successfully",
        recipe: recipe.as_json.merge("thumb_url" => recipe.thumb)
       }, status: :created
     else
       render json: { errors: recipe.errors.full_messages }, status: :unprocessable_entity
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
        ingredient
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
    params.permit(:title, :category, :area, :instructions, :description, :time, :ingredients)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end
end
