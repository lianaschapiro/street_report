class ReportsController < ApplicationController
  def index
  	@report = Report.all
  end

  def show
  	@report = Report.find(params[:id])
  end

  def new
  	@report = Report.new
  end

  def create
  	@report = Report.new(report_params)
  	if @report.save
  		flash[:notice] = "Incident recorded"
  		redirect_to root_path
  	else
  		flash[:notice] = "Unable to record incident"
  		render "back"
  	end
  end

  def edit

  end

  def update

  end

  def destroy
  	@report = Report.find(params[:id])
  	if @report.destroy
  		flash[:notice] = "Incident report deleted"
  		redirect_to reports_path
  	else
  		flash[:notice] = "Unable to delete report"
  		render "back"
  	end
  end

  private
  	def report_params
  		params.require(:report).permit(:title, :body, :Lat, :Lng, :catcall, :stalking, :threat, :touching, :comments, :exposure, :assault, :rape, :group, :gestures, :takingphotos)
  	end

end
