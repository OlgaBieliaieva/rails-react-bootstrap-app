class DropRecipes < ActiveRecord::Migration[8.0]
  def up
    drop_table :recipes
  end

  # def down
  #   create_table :table_name do |t|
  #     t.string :example_field
  #     t.timestamps
  #   end
  # end
end
