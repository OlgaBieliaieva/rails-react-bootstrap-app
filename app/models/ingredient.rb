class Ingredient < ApplicationRecord
  validates :db_id, presence: true
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
end
