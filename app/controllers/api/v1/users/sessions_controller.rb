module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        skip_before_action :verify_authenticity_token
        respond_to :json

        private

        def respond_with(resource, _opts = {})
          token = Warden::JWTAuth::UserEncoder.new.call(resource, :user, nil).first
          render json: { user: resource, token: token }, status: :ok
        end

       def respond_to_on_destroy
          if current_user
            render json: { message: "Logged out successfully" }, status: :ok
          else
           render json: { errors: "User not logged in" }, status: :unauthorized
          end
       end
      end
    end
  end
end
