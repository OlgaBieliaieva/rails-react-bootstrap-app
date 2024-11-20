require 'json'

Ingredient.delete_all

ingredients_file = File.read(Rails.root.join('db', 'seeds', 'db-foodies.ingredients-with-id.json'))
ingredients_data = JSON.parse(ingredients_file)

ingredients_data.each do |ingredient|
  Ingredient.create!(
    idb: ingredient["_id"],
    name: ingredient["name"],
    desc: ingredient["desc"],
    img: ingredient["img"]
  )
end
