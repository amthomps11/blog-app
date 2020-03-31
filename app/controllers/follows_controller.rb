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

      def getFolloweesOfUser
        @followees = User.select(:username,:id).joins("INNER JOIN follows On followee_id = users.id AND follows.follower_id=#{params[:id]}")
        render json: @followees
      end 

      def getFollowId
        @follow = Follow.where("follower_id=#{params[:id]} AND followee_id=#{params[:followee_id]}")
        render json: @follow
      end


      def getFolloweePostsOfUser
        @followees = Post.select(:body,:id, :user_id,:created_at).joins("INNER JOIN follows on followee_id = user_id AND follows.follower_id=#{params[:id]}")
        render json: @followees, include: [:user_restricted]
      end



      def getFollowersOfUser
        @follows = Follow.where("followee_id= #{params[:id]}")
          render json: @follows, include: [:follower=>{include:[:posts]}]
      end 


      def getJustFollowersOfUser
        @follows = Follow.where("followee_id= #{params[:id]}")
          render json: @follows
      end 
    
  
     private
  
    def follow_params
      params.require(:follow).permit(:follower_id, :followee_id)
    end
  
  
  end