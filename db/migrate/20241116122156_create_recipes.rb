class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.string :category, null: false
      t.string :area, null: false
      t.text :instructions, null: false
      t.text :description, null: false
      t.string :thumb, default: 'https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg'
      t.string :time, null: false
      t.string :ingredients, array: true, null: false


      t.timestamps
    end
  end
end
