# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user1=User.create(username:"user1",password:"password")
user2=User.create(username:"user2",password:"password")
user3=User.create(username:"user3",password:"password")
user4=User.create(username:"user4",password:"password")
user5=User.create(username:"user5",password:"password")
user6=User.create(username:"user6",password:"password")


post1=Post.create(body:"first comment",user_id:1)

follow1 = Follow.create(follower_id:1,followee_id:1)
follow2 = Follow.create(follower_id:2,followee_id:1)
follow3 = Follow.create(follower_id:3,followee_id:1)
follow4 = Follow.create(follower_id:4,followee_id:1)
follow5 = Follow.create(follower_id:5,followee_id:1)
follow6 = Follow.create(follower_id:6,followee_id:1)
