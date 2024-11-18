class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :category
      t.string :area
      t.text :instructions
      t.text :description
      t.string :thumb
      t.string :time
      t.text :ingredients, array: true, default: []
      t.integer :favoriteCount, default: 0

      t.timestamps
    end
  end
end
