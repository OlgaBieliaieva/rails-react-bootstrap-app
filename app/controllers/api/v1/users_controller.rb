class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    users = User.all.order(created_at: :asc)
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def profile
    render json: current_api_v1_user, status: :ok
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end
end
