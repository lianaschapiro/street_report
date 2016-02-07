class Report < ActiveRecord::Base

	include Humanizer
  	require_human_on :create

	has_many :comments, dependent: :destroy
end
