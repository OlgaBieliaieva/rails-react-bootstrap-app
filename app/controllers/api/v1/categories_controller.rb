class Api::V1::CategoriesController < ApplicationController
  def index
    # Category.select(:name).group(:name).having("COUNT(*) > 1").each do |category|
    #   duplicates = Category.where(name: category.name).order(:created_at)
    #   duplicates.offset(1).destroy_all # Залишає перший запис, видаляє інші
    # end
    category = Category.all
    render json: category
  end
end
