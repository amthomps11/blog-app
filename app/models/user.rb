class User < ApplicationRecord
    has_many:posts

    has_secure_password

    private 
    def user_params
        params.require(:user).permit( :username, :password )
    end

end
