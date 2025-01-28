class AddLatToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :lat, :text
  end
end
