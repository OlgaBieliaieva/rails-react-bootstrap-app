require 'json'

areas_file = File.read(Rails.root.join('db', 'seeds', 'db-foodies.areas.json'))
areas_data = JSON.parse(areas_file)

areas_data.each do |area|
  Area.create!(
    name: area["name"]
  )
end

categories_file = File.read(Rails.root.join('db', 'seeds', 'db-foodies.categories.json'))
categories_data = JSON.parse(categories_file)

categories_data.each do |category|
  Category.create!(
    name: category["name"],
    image: category["image"],
    description: category["description"]
  )
end

ingredients_file = File.read(Rails.root.join('db', 'seeds', 'db-foodies.ingredients-with-id.json'))
ingredients_data = JSON.parse(ingredients_file)

ingredients_data.each do |ingredient|
  Ingredient.create!(
    db_id: ingredient["_id"],
    name: ingredient["name"],
    description: ingredient["desc"],
    image: ingredient["img"]
  )
end

recipes_file = File.read(Rails.root.join('db', 'seeds', 'db-foodies.recipes.json'))
recipes_data = JSON.parse(recipes_file)

recipes_data.each do |recipe|
  Recipe.create!(
    title: recipe['title'],
    category: recipe['category'],
    area: recipe['area'],
    instructions: recipe['instructions'],
    description: recipe['description'],
    thumb: recipe['thumb'],
    time: recipe['time'],
    ingredients: recipe['ingredients'],
    favorite_count: recipe['favoriteCount']
  )
  end

# testimonials_file = File.read(Rails.root.join('db', 'seeds', 'db-foodies.testimonials.json'))
# testimonials_data = JSON.parse(testimonials_file)

# testimonials_data.each do |testimonial|
#   Testimonial.create!(
#     testimonial: testimonial["testimonial"]
#   )
# end

# puts "Running default seeds..."

# # Імпорт даних до таблиці Item
# load Rails.root.join('db', 'seeds', 'update_ingredients.rb')

# puts "Seeds completed successfully."


# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
