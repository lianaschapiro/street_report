class Comment < ActiveRecord::Base
	belongs_to :report

	include Humanizer
  	require_human_on :create
end
