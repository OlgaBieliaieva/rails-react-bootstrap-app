class CreateIngredients < ActiveRecord::Migration[8.0]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.text :desc
      t.string :img
      t.timestamps
    end
  end
end
