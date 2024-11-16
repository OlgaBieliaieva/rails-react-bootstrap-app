9.times do |i|
  Recipe.create(
    title: "Irish stew",
    category: "Beef",
    area: "Irish",
    instructions: "Heat the oven to 180C/350F/gas mark 4. Drain and rinse the soaked wheat, put it in a medium pan with lots of water, bring to a boil and simmer for an hour, until cooked. Drain and set aside.

Season the lamb with a teaspoon of salt and some black pepper. Put one tablespoon of oil in a large, deep sauté pan for which you have a lid; place on a medium-high heat. Add some of the lamb – don't overcrowd the pan – and sear for four minutes on all sides. Transfer to a bowl, and repeat with the remaining lamb, adding oil as needed.

Lower the heat to medium and add a tablespoon of oil to the pan. Add the shallots and fry for four minutes, until caramelised. Tip these into the lamb bowl, and repeat with the remaining vegetables until they are all nice and brown, adding more oil as you need it.

Once all the vegetables are seared and removed from the pan, add the wine along with the sugar, herbs, a teaspoon of salt and a good grind of black pepper. Boil on a high heat for about three minutes.

Tip the lamb, vegetables and whole wheat back into the pot, and add the stock. Cover and boil for five minutes, then transfer to the oven for an hour and a half.

Remove the stew from the oven and check the liquid; if there is a lot, remove the lid and boil for a few minutes.",
description: "A traditional Irish dish made with lamb, potatoes, carrots, onions, and herbs, cooked in a broth or gravy.",
thumb: "https://ftp.goit.study/img/so-yummy/preview/Irish%20stew.jpg",
time: "160",
ingredients: [ "227g tub clotted cream", "25g butter", "1 tsp cornflour", "100g parmesan", "grated nutmeg" ]


  )
end



# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
