class PostsController < ApplicationController
    def index
      @post = Post.all()
      render json: @post, include: [:user]
     end

     def show
        @post = Post.find(params[:id])
        render json: @post
    end

    def create
        @post = Post.new(post_params)
        if @post.save
            render json: @post, status: :created
          else
            render json: @post.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if @post.save
            render json: @post, status: :destroyed
          else
            render json: @post.errors, status: :unprocessable_entity
            end
            @post.destroy
        end
    
  
       private

    def post_params
         params.require(:post).permit(:body, :user_id)
    end
  end