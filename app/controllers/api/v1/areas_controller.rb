class Api::V1::AreasController < ApplicationController
  def index
    # Area.select(:name).group(:name).having("COUNT(*) > 1").each do |area|
    #   duplicates = Area.where(name: area.name).order(:created_at)
    #   duplicates.offset(1).destroy_all # Залишає перший запис, видаляє інші
    # end
    area = Area.all.order(name: :asc)
    render json: area
  end
end
