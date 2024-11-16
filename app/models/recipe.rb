class Recipe < ApplicationRecord
  validates :title, presence: true
  validates :category, presence: true
  validates :area, presence: true
  validates :instructions, presence: true
  validates :description, presence: true
  validates :thumb, presence: true
  validates :time, presence: true
  validates :ingredients, presence: true
end
