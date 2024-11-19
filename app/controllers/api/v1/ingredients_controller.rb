class Api::V1::IngredientsController < ApplicationController
  def index
  # Ingredient.select(:name).group(:name).having("COUNT(*) > 1").each do |ingredient|
  #   duplicates = Ingredient.where(name: ingredient.name).order(:created_at)
  #   duplicates.offset(1).destroy_all # Залишає перший запис, видаляє інші
  # end
  ingredient = Ingredient.all.order(name: :asc)
    render json: ingredient
  end
end
