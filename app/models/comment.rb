class Comment < ActiveRecord::Base
	belongs_to :report

	validates_presence_of  :body

	include Humanizer
  	require_human_on :create
end
