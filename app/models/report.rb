class Report < ActiveRecord::Base
	has_many :comments, dependent: :destroy

	include Humanizer
  	require_human_on :create

  	validates_presence_of :title, :body

	has_attached_file :photo, :styles => { :medium => "200x200>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
	validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/
end
