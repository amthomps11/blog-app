class UploaderController < ApplicationController
    def update
        if params[:image]
          # The data is a file upload coming from <input type="file" />
          @user = User.find(params[:id])
          @user.image.attach(params[:image])
          # Generate a url for easy display on the front end 
          photo = url_for(@user.image)
        end
        
          # Now save that url in the user
        if @user.update(image: photo)
          render json: @user, status: :ok
        end
  end
end