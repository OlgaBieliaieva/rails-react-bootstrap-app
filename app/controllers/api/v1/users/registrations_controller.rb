module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        skip_before_action :verify_authenticity_token
        respond_to :json

        def sign_up_params
          params.require(:user).permit(:name, :email, :password)
        end

        def account_update_params
          params.require(:user).permit(:name, :email, :password, :avatar, :followers, :followings, :favorite_recipes)
        end

        private

         def respond_with(resource, _opts = {})
           if resource.persisted?
              token = Warden::JWTAuth::UserEncoder.new.call(resource, :user, nil).first
              render json: { user: resource, token: token }, status: :created
           else
             render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
           end
         end
      end
    end
  end
end
