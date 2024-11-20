class CreateIngredients < ActiveRecord::Migration[8.0]
  def change
    create_table :ingredients do |t|
      t.string :db_id
      t.string :name
      t.string :description
      t.string :image
      t.timestamps
    end
  end
end
