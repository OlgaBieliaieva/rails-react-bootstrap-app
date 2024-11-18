class Ingredient < ApplicationRecord
  validates :name, presence: true
  validates :desc, presence: true
  validates :img, presence: true
end
