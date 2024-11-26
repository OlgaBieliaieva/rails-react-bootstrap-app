# class ApplicationController < ActionController::Base
#   # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
#   allow_browser versions: :modern
# end

class ApplicationController < ActionController::API
  include Devise::Controllers::Helpers

  # before_action :authenticate_user!

  # Додаткові методи або налаштування можна додавати тут, якщо потрібно
end
