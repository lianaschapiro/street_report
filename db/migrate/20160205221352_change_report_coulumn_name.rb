class ChangeReportCoulumnName < ActiveRecord::Migration
  def change
  	rename_column :reports, :comments, :mean_comments
  end
end
