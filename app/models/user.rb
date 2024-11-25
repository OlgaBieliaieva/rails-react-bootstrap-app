class User < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 20 }
  validates :email, presence: true, uniqueness: { message: " is already registered" } # , format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, length: { minimum: 8 }
end
