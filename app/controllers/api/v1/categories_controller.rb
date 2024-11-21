class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show]
  def index
    # Category.select(:name).group(:name).having("COUNT(*) > 1").each do |category|
    #   duplicates = Category.where(name: category.name).order(:created_at)
    #   duplicates.offset(1).destroy_all # Залишає перший запис, видаляє інші
    # end
    category = Category.all
    render json: category
  end

  def show
    # Отримуємо всі рецепти, що належать до категорії
    recipes = Recipe.where(category: @category.name)

    # Фільтрація за областю (area)
    if params[:area].present? && params[:area] != "All"
       recipes = recipes.where(area: params[:area])
    end

    # Фільтрація за інгредієнтами
    # if params[:ingredient].present? && params[:ingredient] != "All"
    #   ingredient = Ingredient.find_by(name: params[:ingredient])
    #   if ingredient
    #     recipes = recipes.where("ingredients @> ?", [ { db_id: ingredient.id } ].to_json)
    #   else
    #     recipes = Recipe.none # Якщо інгредієнт не знайдено, повертаємо пустий результат
    #   end
    # end


    # render json: @category
    render json: {
          category: {
            id: @category.id,
            name: @category.name,
            description: @category.description # Додайте інші необхідні поля
          },
          recipes: recipes
        }, status: :ok
    # rescue StandardError => e
    #   render json: { error: "Something went wrong: #{e.message}" }, status: :internal_server_error
    # end
  end

  private

  # def category_params
  #   params.permit(:title, :category, :area, :instructions, :description, :thumb, :time, :ingredients)
  # end

  def set_category
    @category = Category.find(params[:id])
  end
end
