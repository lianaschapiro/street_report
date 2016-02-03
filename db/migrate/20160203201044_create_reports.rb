class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :title
      t.string :body
      t.float :Lat
      t.float :Lng
      t.boolean :catcall
      t.boolean :stalking
      t.boolean :threat
      t.boolean :touching

      t.timestamps null: false
    end
  end
end
