class AddAdressToReports < ActiveRecord::Migration
  def change
    add_column :reports, :address, :string
  end
end
