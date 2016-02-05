class AddReportRefToComments < ActiveRecord::Migration
  def change
    add_reference :comments, :report, index: true, foreign_key: true
  end
end
