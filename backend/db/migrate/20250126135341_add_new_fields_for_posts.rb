class AddNewFieldsForPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :phone_number, :integer
    add_column :posts, :phone_notifications, :boolean, default: false
    add_column :posts, :email, :text
    add_column :posts, :email_notifications, :boolean, default: false
  end
end
