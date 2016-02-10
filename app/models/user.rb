class User < ActiveRecord::Base
	has_secure_password
	
	validates :email, presence: true
	validates :password, presence: true, length: {in: 4..20}, on: :create
end
