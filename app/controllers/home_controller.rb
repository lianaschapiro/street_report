class HomeController < ApplicationController
  def home
  	@report = Report.new
  	@reports = Report.all
 	@comment = Comment.new
  end
end
