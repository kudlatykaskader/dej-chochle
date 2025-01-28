class AddContactToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :contact, :string
  end
end
