Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/users', to: "users#index"
  get '/users/:id', to: "users#show"
  get '/users/:id/posts', to: "users#show_posts"
  post '/users', to:"users#create"
  patch '/users/:id', to: "users#update"
  get  '/userpic/:id', to: "users#showimage"
  # put '/users/:id', to: "users#updatephoto"

  patch 'uploader/:id', to: 'uploader#update'

  
  get '/usersimage/:id', to: "users#showimage"

  delete '/users/:id', to:"users#destroy"

  get '/posts', to: "posts#index"
  get '/posts/:id', to: "posts#show"
  post '/posts', to: "posts#create"
  delete '/posts/:id', to:"posts#destroy"


  get '/follows', to: "follows#index"
  get '/follows/:id', to: "follows#show"
  post '/follows', to: "follows#create"
  delete '/follows/:id', to:"follows#destroy"
  get '/followees/:id', to: "follows#getFolloweesOfUser"
  get '/followeeposts/:id', to: "follows#getFolloweePostsOfUser"

  get '/followers/:id', to: "follows#getFollowersOfUser"
  get '/followeeposts2/:id', to: "follows#getFolloweePostsOfUserTry2"
  get 'followersonly/:id', to: "follows#getJustFollowersOfUser"


  post '/auth/login', to: 'authentication#login'


end
