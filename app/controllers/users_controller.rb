class UsersController < ApplicationController
  def index
    @user = User.all()
    render json: @user, include: [:id, :posts]
   end

   
   def show
    @user = User.find(params[:id])
    render json: @user, include: [:posts]
   end


   def showimage
    @user = User.find(params[:id])
    render json: @user.image
   end


    def create 
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def destroy
    @user = User.find(params[:id])
    if @user.save
        render json: @user, status: :destroyed
      else
        render json: @user.errors, status: :unprocessable_entity
        end
        @user.destroy
    end

   def show_posts
    @user = User.find(params[:id])
    @posts = @user.posts
    render json: @posts
   end


   def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render json: @user
  end

  

   private

  def user_params
    params.require(:user).permit(:username, :password, :image)
  end


end