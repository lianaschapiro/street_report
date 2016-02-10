class ReportsController < ApplicationController
  def index
  	@reports = Report.all
  end

  def show
  	@report = Report.find(params[:id])
    @comment = Comment.new

  end

  def admin_show
    @reports = Report.all
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
  		flash[:notice] = "#{@report.errors.full_messages.first}"
  		redirect_to root_path
  	end
  end

  def edit
    @report = Report.find(params[:id])

  end

  def update
    @report = Report.find(params[:id])
    @report.update(report_params)
    if @report.save
      if @report.flag_report == true
        flash[:notice] = "Report Flagged"
        # render root_path
        respond_to do |format|
          format.html
          format.js
        end
      else
        redirect_to admin_show_path
      end
    else
      flash[:notice] = "Unable to edit report"
      redirect_to admin_show_path
    end

  end

  def destroy
  	@report = Report.find(params[:id])
  	if @report.destroy
  		flash[:notice] = "Incident report deleted"
  		redirect_to root_path
  	else
  		flash[:notice] = "Unable to delete report"
  		render "back"
  	end
  end

  private
  	def report_params
  		params.require(:report).permit(:title, :body, :address, :photo, :Lat, :Lng, :catcall, :stalking, :threat, :touching, :mean_comments, :exposure, :assault, :rape, :group, :gestures, :takingphotos, :flag_report, :incident_date, :humanizer_answer, :humanizer_question_id)
  	end

end
