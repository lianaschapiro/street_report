class AddDetailsToReports < ActiveRecord::Migration
  def change
  	add_column :reports, :comments, :boolean
 	add_column :reports, :exposure, :boolean
 	add_column :reports, :assault, :boolean
 	add_column :reports, :rape, :boolean
 	add_column :reports, :group, :boolean
 	add_column :reports, :gestures, :boolean
 	add_column :reports, :takingphotos, :boolean
  end
end
