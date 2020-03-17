# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1 = User.create(username:"John Doe",password:"password")
user2 = User.create(username:"Jane Doe",password:"password")
user3 = User.create(username:"Alex T",password:"password")


post1 = Post.create(body:"Wow this is a cool site",user_id:1)
post2 = Post.create(body:"I like movies",user_id:2)
post3 = Post.create(body:"Hey how is everyone",user_id:3)


follow1 = Follow.create(follower_id:1,followee_id:1)
follow2 = Follow.create(follower_id:2,followee_id:1)
follow3 = Follow.create(follower_id:3,followee_id:1)
follow1 = Follow.create(follower_id:2,followee_id:3)
