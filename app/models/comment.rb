class Comment < ActiveRecord::Base
	belongs_to :report

	validates_presence_of :name, :body

	include Humanizer
  	require_human_on :create
end
