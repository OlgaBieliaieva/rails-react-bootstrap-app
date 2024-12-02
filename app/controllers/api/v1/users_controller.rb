class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def current
    if current_user
      render json: { user: current_user }
    else
      render json: { error: "Not logged in" }, status: :unauthorized
    end
  end
end
