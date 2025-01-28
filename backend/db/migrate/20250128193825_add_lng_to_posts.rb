class AddLngToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :lng, :string
  end
end
