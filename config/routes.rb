Rails.application.routes.draw do
  devise_for :users, defaults: { format: :json }, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  namespace :api do
    namespace :v1 do
      get "recipes/index"
      post "recipes/create"
      get "recipes/show/:id", to: "recipes#show"
      delete "recipes/destroy/:id", to: "recipes#destroy"
      get "categories/index"
      get "categories/show/:id", to: "categories#show"
      get "areas/index"
      get "ingredients/index"
      get "users/current_user", to: "users#current"
    end
  end
  root "homepage#index"
  get "/*path" => "homepage#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
