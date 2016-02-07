class AddDateToReports < ActiveRecord::Migration
  def change
  	 add_column :reports, :incident_date, :datetime
  end
end
