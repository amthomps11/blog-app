class User < ApplicationRecord
    has_many:posts
    has_many :followers, :class_name => 'Follow', :foreign_key => 'followee_id'
    has_many :followees, :class_name => 'Follow', :foreign_key => 'follower_id'
    has_secure_password


    
    private 
    def user_params
        params.require(:user).permit( :username, :password )
    end

end
