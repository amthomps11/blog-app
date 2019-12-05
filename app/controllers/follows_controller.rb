class FollowsController < ApplicationController
    def index
      @follow = Follow.all()
      render json: @follow
     end
  
     def show
      @follow = Follow.find(params[:id])
      render json: @follow
     end
  
  
      def create 
          @follow = Follow.new(follow_params)
          if @follow.save
              render json: @follow, status: :created
          else
              render json: @follow.errors, status: :unprocessable_entity
          end
      end
  
      def destroy
      @follow = Follow.find(params[:id])
      if @follow.save
          render json: @follow, status: :destroyed
        else
          render json: @follow.errors, status: :unprocessable_entity
          end
          @follow.destroy
      end
  
    
  
     private
  
    def follow_params
      params.require(:follow).permit(:follower_id, :followee_id)
    end
  
  
  end