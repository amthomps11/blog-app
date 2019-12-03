class PostsController < ApplicationController
    def index
      @post = Post.all()
      render json: @post
     end

     def show
        @post = Post.find(params[:id])
        render json: @post
    end
  
    
  end