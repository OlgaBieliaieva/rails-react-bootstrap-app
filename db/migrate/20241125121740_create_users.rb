class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :avatar
      t.string :email
      t.string :password
      t.jsonb :followers, default: []
      t.jsonb :followings, default: []
      t.jsonb :favorite_recipes, default: []
      t.timestamps
    end
  end
end
