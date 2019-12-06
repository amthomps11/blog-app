class Post < ApplicationRecord
  belongs_to :user
  belongs_to :user_restricted, -> {select('users.id, users.username')}, class_name: 'User', foreign_key: 'user_id'
end
