Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/users', to: "users#index"
  get '/users/:id', to: "users#show"
  get '/users/:id/posts', to: "users#show_posts"
  post '/users', to:"users#create"
  delete '/users/:id', to:"users#destroy"

  get '/posts', to: "posts#index"
  get '/posts/:id', to: "posts#show"
  post '/posts', to: "posts#create"
  delete '/posts/:id', to:"posts#destroy"


  get '/follows', to: "follows#index"
  get '/follows/:id', to: "follows#show"
  post '/follows', to: "follows#create"
  delete '/follows/:id', to:"follows#destroy"

  post '/auth/login', to: 'authentication#login'


end
