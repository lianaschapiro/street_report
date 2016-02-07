class AddFlagToReports < ActiveRecord::Migration
  def change
    add_column :reports, :flag_report, :boolean
  end
end
