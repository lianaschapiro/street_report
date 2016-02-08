class AddAttachmentPhotoToReports < ActiveRecord::Migration
  def self.up
    change_table :reports do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :reports, :photo
  end
end
