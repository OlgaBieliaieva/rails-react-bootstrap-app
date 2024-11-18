class Category < ApplicationRecord
  validates :name, presence: true
  validates :image, presence: true
  validates :description, presence: true
end
