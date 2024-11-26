class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist


  validates :name, presence: true, length: { minimum: 3, maximum: 20 }
  validates :email, presence: true, uniqueness: { message: "is already registered" }
  validates :password, presence: true, length: { minimum: 8 }
end
