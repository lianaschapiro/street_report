class HomeController < ApplicationController
  def home
  	@report = Report.new
  end
end
