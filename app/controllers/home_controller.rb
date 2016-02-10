class HomeController < ApplicationController
  def home
  	@report = Report.new
  	@reports = Report.order("created_at DESC")
  end

  def contact
  end
end
