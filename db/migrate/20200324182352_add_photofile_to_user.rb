class AddPhotofileToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :photofile, :text
  end
end
