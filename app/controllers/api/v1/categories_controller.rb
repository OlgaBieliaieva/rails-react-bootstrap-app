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
    render json: @category
  end

  private

  # def category_params
  #   params.permit(:title, :category, :area, :instructions, :description, :thumb, :time, :ingredients)
  # end

  def set_category
    @category = Category.find(params[:id])
  end
end
