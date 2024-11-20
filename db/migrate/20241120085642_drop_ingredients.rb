class DropIngredients < ActiveRecord::Migration[8.0]
  def up
    drop_table :ingredients
  end
end
